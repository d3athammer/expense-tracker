import { border } from "@chakra-ui/react";
import { CanceledError } from "../services/api-client";
import { useEffect, useState } from "react"
import userService,{ User } from "../services/user-service";

const TestLink = () => {
  //create user, user as empty array
  //the <User[]> syntax specifies that the users state variable will store an array of User
  const [ users, setUsers ] = useState<User[]>([]);
  const [ error, setError ] = useState('');
  // set loader state
  const [ isLoading, setLoading ] = useState(false);

  // error messages and loading spinner
  useEffect(() =>{
    // get -> promise -> res / err
    //allows you to abort one or more Web requests as and when desired.
    //Using its constructor, a very standard way to cancel or abort asynchronous operations
    //display loader
    setLoading(true);
    const {request, cancel} = userService.getAllUsers();
      request.then(res => {
        setUsers(res.data)
        // deactive where our promise is settled, accepted
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
    return () => cancel();
  },[])

  //Delete user
  const deleteUser = (user: User) => {
    const oriUsers = [...users]
    setUsers(users.filter(u =>  u.id !== user.id))

    userService
      .deleteUser(user.id)
      .catch(err => {
        setError(err.message)
        setUsers(oriUsers)
      })
  }
  //Create user
  const addUser = () => {
    const originalUsers = [...users]
    // to make sure id is more than 0
    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = {id: newUserId, name: 'Tendermeat'}
    setUsers([newUser, ...users])
      // .then(res => setUsers([res.data, ...users]))
      // or destructure res.data
      userService
      .addUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]) )
      .catch(err => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }
  //Updating user
  const updateUser = (user: User) => {
    const originalUsers = [...users]
    const updatedUser = {...user, name: user.name + '!'}
    setUsers(users.map( u => u.id === user.id ? updatedUser : u))

    userService
      .updateUser(updatedUser)
      .catch(err => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  return (
    <>
    <button className="btn btn-primary" onClick={addUser}>Add</button>
     {error && <p className="text-danger">{error}</p>}
     {/* display loading spinner while loading */}
     {isLoading && <div className="spinner-border"></div>}
    <div>
      <ul className="list-group">
        {users.map((user) =>
        <li className="list-group-item d-flex justify-content-between" key={user.id}>{user.name}
        <div className="">
        <button className="btn btn-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
        <button className="btn btn-outline-danger" key={user.id} onClick={() => deleteUser(user)}>Delete</button>
        </div>
        </li>
        )}
      </ul>
    </div>
    </>
  )
}

export default TestLink;
