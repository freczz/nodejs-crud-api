import { ERROR_MESSAGES } from "../constants/constants";

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type IUserRequestData = Omit<IUser, 'id'>;

export interface IError {
  code: number,
  message: ERROR_MESSAGES
}

export type serverResponse = IUser[] | IUser | IError | null;
 