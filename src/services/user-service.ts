import apiClient from "./api-client";


export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    // configuration object as the 2nd parameter
    // get request to the user's endpoint
    // return it immediately
    const request = apiClient.get<User[]>('/users', {signal: controller.signal})
    // create a cancel function that does the same thing, then destructure it on TestLink
    // return 2 props
    return { request, cancel: ()=> controller.abort }
  }

  deleteUser(id:number) {
    return apiClient.delete(`/users/${id}`)
  }

  addUser(user:User) {
     return apiClient.post('/users/', user)
  }

  updateUser(user:User) {
    return apiClient.patch(`/users/${user.id}`, user)
  }
}

export default new UserService();
