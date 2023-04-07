import userService,{ User } from "../services/user-service";
import useUsers from "../hooks/useUsers";

const TestLink = () => {

  const { users, error, isLoading, setUsers, setError } = useUsers()
  //Delete user
  const deleteUser = (user: User) => {
    const oriUsers = [...users]
    setUsers(users.filter(u =>  u.id !== user.id))

    userService
      .delete(user.id)
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
      .create(newUser)
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
      .update(updatedUser)
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
