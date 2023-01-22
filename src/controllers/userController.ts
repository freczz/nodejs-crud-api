import { getAllDBUsers, findDBUser, createNewDBUser, updateDBUser, removeDBUser } from "../models/userModel";
import { validateUserRequestData, validateUuid } from '../validators/userValidator';  
import { IUser, IUserRequestData } from "../interfaces/interfaces";
import { ERROR_MESSAGES } from "../constants/constants";

export const getUsers = () => getAllDBUsers();

export const getUser = (userId: string) => {
  validateUuid(userId);
  const findedUser: IUser | undefined = findDBUser(userId);

  if (!findedUser) {
    throw new Error(ERROR_MESSAGES.NonExistentUserId);
  }

  return findedUser;
};

export const postUser = (userData: IUserRequestData) => {
  validateUserRequestData(userData);
  return createNewDBUser(userData);
};

export const putUser = (userId: string, userData: IUserRequestData) => {
  validateUserRequestData(userData);
  validateUuid(userId);
  const updatedUser: IUser | null = updateDBUser(userId, userData);

  if (!updatedUser) {
    throw new Error(ERROR_MESSAGES.NonExistentUserId);
  }

  return updatedUser;
};

export const deleteUser = (userId: string) => {
  validateUuid(userId);
  const removeStatus: boolean = removeDBUser(userId);

  if (!removeStatus) {
    throw new Error(ERROR_MESSAGES.NonExistentUserId);
  }
};
