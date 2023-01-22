import { validate as isUuidValid, version as uuidVersion } from 'uuid';
import { REQUESTS_METHODS, UUID_VERSION, BASE_URL, MAX_URL_LENGTH, ERROR_MESSAGES } from "../constants/constants";
import { IUserRequestData } from "../interfaces/interfaces";

export const validateUserRequestData = (userData: IUserRequestData): void => {
  const {username, age, hobbies} = userData;
  let [usernameValid, ageValid, hobbiesValid] = [false, false, false];

  if (username && typeof username === 'string') {
    usernameValid = true;
  }

  if (age && typeof age === 'number' && age > 0) {
    ageValid = true;
  }
  
  if (hobbies && hobbies instanceof Array && hobbies.every(item => typeof item === 'string')) {
    hobbiesValid = true;
  }

  if (!usernameValid || !ageValid || !hobbiesValid) {
    throw new Error(ERROR_MESSAGES.InvalidRequestData);
  }
};

export const validateUuid = (id: string) => {
  if (!isUuidValid(id) || uuidVersion(id) != UUID_VERSION) {
    throw new Error(ERROR_MESSAGES.InvalidUserId);
  }
};

export const validateUrl = (url: string, method: REQUESTS_METHODS): string => {
  if (
    url.startsWith(BASE_URL) &&
    (url.length === BASE_URL.length || url[BASE_URL.length] === '/')
  ) {
    const splitedUrl = url.split('/').slice(1);

    if (
      splitedUrl.length > MAX_URL_LENGTH ||
      (splitedUrl.length !== MAX_URL_LENGTH && (method === REQUESTS_METHODS.PUT || method === REQUESTS_METHODS.DELETE))
    ) {
      throw new Error(ERROR_MESSAGES.NonExistentEndpoint);
    }

    return splitedUrl[2] || '';
  }
  throw new Error(ERROR_MESSAGES.NonExistentEndpoint);
};
