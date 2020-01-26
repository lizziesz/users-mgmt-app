export interface User {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  username: string;
}

export interface Users {
  totalCount: number;
  results: User[];
}

export interface UserRequest {
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
}
