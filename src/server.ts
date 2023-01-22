import { createServer, Server } from 'http';
import { getUsers, getUser, postUser, putUser, deleteUser } from './controllers/userController';
import { validateUrl } from './validators/userValidator';
import { REQUESTS_METHODS, STATUS_CODE, ERROR_MESSAGES } from './constants/constants';
import { serverResponse, IUserRequestData } from './interfaces/interfaces';
import { getRequestData, getErrorStatusCode } from './utils/utilities';

export const server: Server = createServer(async (req, res) => {
    let response: serverResponse = null;
    let code = STATUS_CODE.SUCCESS_200;

    res.setHeader('Content-Type', 'application/json');

    try {
      const method: REQUESTS_METHODS = <REQUESTS_METHODS>req.method;
      const url = req.url || '';
      const userId = validateUrl(url, method);
      
      let data: IUserRequestData;

      switch (method) {
        case REQUESTS_METHODS.GET:
          if (userId) {
            response = getUser(userId);
          } else {
            response = getUsers();
          }
          break;
        case REQUESTS_METHODS.POST:
          data = await getRequestData(req);
          code = STATUS_CODE.SUCCESS_201;
          response = postUser(data);
          break;
        case REQUESTS_METHODS.PUT:
          data = await getRequestData(req);
          response = putUser(userId, data);
          break;
        case REQUESTS_METHODS.DELETE:
          code = STATUS_CODE.SUCCESS_204;
          deleteUser(userId);
          break;
        default:
          code = STATUS_CODE.NOT_FOUND;
          response = { code, message: ERROR_MESSAGES.NonExistentEndpoint };
      }
    } catch (err) {
      const message = <ERROR_MESSAGES>(
        (err instanceof Error && Object.values<string>(ERROR_MESSAGES).includes(err.message)
          ? err.message
          : ERROR_MESSAGES.InternalServerError)
      );

      code = getErrorStatusCode(message);

      response = { code, message };
    } finally {
      res.writeHead(code);
      if (response) {
        res.end(JSON.stringify(response));
      } else {
        res.end();
      }
    }
});

export const runServer = (port: number): void => {
  server.listen(port, () => console.log(`Server running on port ${port}`));
};
