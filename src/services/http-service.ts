import apiClient from "./api-client";

interface Entity {
  id: number;
}

// Define a `HttpService` class that provides methods for working with user data
class HttpService {

  endpoint : string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  // <T> is a placeholder for type
  getAll<T>() {
    // Create an `AbortController` instance to handle cancelling the request
    const controller = new AbortController();
    // Send a GET request to the `/T` endpoint using the `apiClient` object
    const request = apiClient.get<T[]>(this.endpoint, {signal: controller.signal})

    // Return an object containing the request and a `cancel` function that can be used to cancel the request
    return { request, cancel: ()=> controller.abort }
  }

  // Define a method for deleting a user by ID
  delete(id:number) {
    // Send a DELETE request to the `/users/:id` endpoint using the `apiClient` object
    return apiClient.delete(this.endpoint + `/${id}`)
  }

  // Define a method for adding a new user
  create<T>(entity:T) {
    // Send a POST request to the `/users` endpoint using the `apiClient` object, with the `user` object as the request body
     return apiClient.post(this.endpoint, entity)
  }

  // Define a method for updating an existing user
  update<T extends Entity>(entity:T) {
    // Send a PATCH request to the `/users/:id` endpoint using the `apiClient` object, with the `user` object as the request body
    return apiClient.patch(`${this.endpoint}/${entity.id}`, entity)
  }
}

// Export a new instance of the `UserService` class as the default export from this module
// For reusability purposes
const create = (endpoint: string) => new HttpService(endpoint)

export default create;
