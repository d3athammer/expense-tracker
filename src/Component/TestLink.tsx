import { border } from "@chakra-ui/react";
import axios, { CanceledError } from "axios"
import { useEffect, useState } from "react"

interface User {
  id: number;
  name: string;
}

const TestLink = () => {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ error, setError ] = useState('');
  // set loader state
  const [ isLoading, setLoading ] = useState(false);

  useEffect(() =>{
    // get -> promise -> res / err
    //allows you to abort one or more Web requests as and when desired.
    //Using its constructor, a very standard way to cancel or abort asynchronous operations
    const controller = new AbortController();

    //display loader
    setLoading(true);

    axios
    // configuration object as the 2nd parameter
    .get<User[]>('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
    .then(res => {
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
    return () => controller.abort();
  },[])

  //Delete user
  const deleteUser = (user: User) => {
    const oriUsers = [...users]
    setUsers(users.filter(u =>  u.id !== user.id))

    axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
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
    // create a POST request
    axios.post('https://jsonplaceholder.typicode.com/usersx/', newUser)
      // .then(res => setUsers([res.data, ...users]))
      // or destructure res.data
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

    axios.patch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
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
