import axios from "axios"
import { useEffect, useState } from "react"

interface User {
  id: number;
  name: string;
}

const TestLink = () => {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ error, setError ] = useState('');

  useEffect(() =>{
    // get -> promise -> res / err
    axios
    .get<User[]>('https://jsonplaceholder.typicode.com/xusers')
    .then(res => setUsers(res.data))
    .catch(err => setError(err.message));
  })

  return (
    <>
     {error && <p className="text-danger">{error}</p>}
    <div>
      <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
    </>
  )
}

export default TestLink;
