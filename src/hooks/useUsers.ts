import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import userService, { User } from "../services/user-service";

const useUsers = () => {
  //create user, user as empty array
  //the <User[]> syntax specifies that the users state variable will store an array of User
  const [ users, setUsers ] = useState<User[]>([]);
  const [ error, setError ] = useState('');
  // set loader state
  const [ isLoading, setLoading ] = useState(false);

  // error messages and loading spinner
  useEffect(() => {
    setLoading( true);
    // get -> promise -> res / err
    //allows you to abort one or more Web requests as and when desired.
    //Using its constructor, a very standard way to cancel or abort asynchronous operations
    //display loader
    // specify the type of object you gonna fetch from the server,
    // since we are using generic http-service
    const {request, cancel} = userService.getAll<User>();

      request
        .then(res => {
          setUsers(res.data)
          setLoading(false)})
        .catch(err => {
          // if the error thrown by Axios was due to a cancellation of the request,
          //using the AbortController instance.
          if (err instanceof CanceledError) return;
          // otherwise, display error message
          setError(err.message);
        // deactive where our promise is settled, rejected
          setLoading(false);
        });
      //
    return () => {cancel()};
  },[])

  // destructure this so testlink can access using useUsers hook
  return { users, error, isLoading, setUsers, setError };
}


export default useUsers;
