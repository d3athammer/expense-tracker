// Import the `apiClient` object from the `./api-client` module
import create from './http-service';
// Define a `User` interface that describes the shape of user objects
export interface User {
  id: number;
  name: string;
}

export default create('/users');
