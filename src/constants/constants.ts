export const BASE_URL = '/api/users';

export const MAX_URL_LENGTH = BASE_URL.split('/').length;

export const UUID_VERSION = 4;

export enum REQUESTS_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum STATUS_CODE {
  SUCCESS_200 = 200,
  SUCCESS_201 = 201,
  SUCCESS_204 = 204,
  INVALID_DATA = 400,
  NOT_FOUND= 404,
  SERVER_ERROR = 500,
}

export enum ERROR_MESSAGES {
  InvalidUserId = 'This user id is invalid',
  NonExistentUserId = "This user id doesn't exist",
  InvalidRequestData = 'This request data is invalid',
  NonExistentEndpoint = "This API endpoint doesn't exist",
  InternalServerError = 'Internal server error has occured',
}
