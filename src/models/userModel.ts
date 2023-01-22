import { v4 as getNewUserId } from 'uuid';
import { IUser, IUserRequestData } from "../interfaces/interfaces";

const db: IUser[] = [];

export const getAllDBUsers = (): IUser[] => db;

export const findDBUser = (id: string): IUser | undefined => db.find((user: IUser): boolean => user.id === id);

export const createNewDBUser = (data: IUserRequestData): IUser => {
  const newUser: IUser = { id: getNewUserId(), ...data };
  db.push(newUser);
  return newUser;
};

export const updateDBUser = (id: string, data: IUserRequestData): IUser | null => {
  const userIndex: number = db.findIndex((user: IUser): boolean => user.id === id);

  if (userIndex < 0) {
    return null;
  }

  const updatedUser = { id, ...data };
  db[userIndex] = updatedUser;
  return updatedUser;
};

export const removeDBUser = (id: string): boolean => {
  const userIndex:number = db.findIndex((user: IUser): boolean => user.id === id);

  if (userIndex < 0) {
    return false;
  }

  db.splice(userIndex, 1);
  return true;
};
