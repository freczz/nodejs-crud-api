import { IncomingMessage } from 'http';
import { STATUS_CODE, ERROR_MESSAGES } from '../constants/constants';
import { IUser } from '../interfaces/interfaces';

export const parseJson = (json: string): IUser => {
  try {
    const data: IUser = JSON.parse(json);
    return data;
  } catch {
    throw new Error(ERROR_MESSAGES.InvalidRequestData);
  }
};

export const getErrorStatusCode = (err: ERROR_MESSAGES): STATUS_CODE => {
  switch (err) {
    case ERROR_MESSAGES.NonExistentUserId:
    case ERROR_MESSAGES.NonExistentEndpoint:
      return STATUS_CODE.NOT_FOUND;

    case ERROR_MESSAGES.InvalidUserId:
    case ERROR_MESSAGES.InvalidRequestData:
      return STATUS_CODE.INVALID_DATA;

    default:
      return STATUS_CODE.SERVER_ERROR;
  }
};

export const getRequestData = async (req: IncomingMessage): Promise<IUser> => {
  const bufferData = [];

  for await (const chunk of req) {
    bufferData.push(chunk);
  }

  return parseJson(Buffer.concat(bufferData).toString());
};
