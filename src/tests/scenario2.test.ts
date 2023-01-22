import request from 'supertest';
import { v4 as newUuidv4 } from 'uuid';
import { server } from '../server';
import { BASE_URL, ERROR_MESSAGES } from '../constants/constants';
import { IUserRequestData } from "../interfaces/interfaces";

export const testData: IUserRequestData = {
  username: 'Masha',
  age: 23,
  hobbies: [],
};

export const updatingData: IUserRequestData = {
  username: 'Irina',
  age: 27,
  hobbies: ['coding', 'cooking'],
};

afterAll(() => {
  server.close();
});

describe('Test API methods with nonexistent user id', () => {
  const randomId = newUuidv4();

  test('Create new user', async () => {
    await request(server)
      .post(BASE_URL)
      .send(testData)
      .expect('Content-Type', /json/).expect(201);
  });

  test('Try to get nonexistent user', async () => {
    await request(server)
      .get(`${BASE_URL}/${randomId}`)
      .expect(404)
      .expect({ code: 404, message: ERROR_MESSAGES.NonExistentUserId });
  });

  test('Try to update nonexistent user', async () => {
    await request(server)
      .put(`${BASE_URL}/${randomId}`)
      .send(updatingData)
      .expect(404)
      .expect({ code: 404, message: ERROR_MESSAGES.NonExistentUserId });
  });

  test('Try to delete nonexistent user', async () => {
    await request(server)
      .delete(`${BASE_URL}/${randomId}`)
      .expect(404)
      .expect({ code: 404, message: ERROR_MESSAGES.NonExistentUserId });
  });
});
