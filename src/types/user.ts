export type User = {
  id: number;
  email: string;
  password: string;
};

export type UserResponse = {
  users: User[];
};

export type RegisterUser = {
  email: string;
  password: string;
};
