export interface User {
  id: string;
  email: string;
  firstname?: string;
  username: string;
}

export interface Users {
  totalCount: number;
  results: User[];
}

export interface NewUser {
  email: string;
  username: string;
}