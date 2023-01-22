import request from 'supertest';
import { server } from '../server';
import { BASE_URL, ERROR_MESSAGES } from '../constants/constants';
import { IUserRequestData } from '../interfaces/interfaces';

export const testData: IUserRequestData = {
  username: 'Vlad',
  age: 17,
  hobbies: ['drinking'],
};

afterAll(() => {
  server.close();
});

describe('Test API methods with invalid user data', () => {
  let id = '';
  let invalidId = '';
  const invalidUserData: Partial<IUserRequestData>[] = [
    {
      username: testData.username,
      age: testData.age,
    },
    {
      username: testData.username,
      hobbies: testData.hobbies,
    },
    {
      age: testData.age,
      hobbies: testData.hobbies,
    },
  ];

  test('Create new user', async () => {
    const response = await request(server)
      .post(BASE_URL)
      .send(testData)
      .expect('Content-Type', /json/)
      .expect(201);

    id = response.body.id;
  });

  test('Try to get user with invalid id', async () => {
    invalidId = `inv${id}alid`;
    await request(server)
      .get(`${BASE_URL}/${invalidId}`)
      .expect(400)
      .expect({ code: 400, message: ERROR_MESSAGES.InvalidUserId });
  });

  test('Try to add user with invalid user data', async () => {
    invalidUserData.forEach(async (invalidUser) => {
      await request(server)
        .post(`/api/users`)
        .send(invalidUser)
        .expect(400).expect({ code: 400, message: ERROR_MESSAGES.InvalidRequestData });
    });
  });

  test('Try to update user with invalid id', async () => {
    invalidId = `inv${id}alid`;
    await request(server)
      .put(`${BASE_URL}/${invalidId}`)
      .send(testData)
      .expect(400)
      .expect({ code: 400, message: ERROR_MESSAGES.InvalidUserId });
  });

  test('Try to update user with invalid user data', async () => {
    invalidUserData.forEach(async (invalidUser) => {
      await request(server)
        .put(`${BASE_URL}/${id}`)
        .send(invalidUser)
        .expect(400)
        .expect({ code: 400, message: ERROR_MESSAGES.InvalidRequestData });
    });
  });

  test('Try to delete user with invalid id', async () => {
    await request(server)
      .delete(`${BASE_URL}/${invalidId}`)
      .expect(400)
      .expect({ code: 400, message: ERROR_MESSAGES.InvalidUserId });
  });
});
