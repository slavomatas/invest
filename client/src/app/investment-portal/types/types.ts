export interface Portfolio {
  name: string;
  id: string;
}

export interface User {
  name: string;
  surname: string;
  username: string;
  email: string;
  role: {
    name: string,
    description: string
  }
}
