import request from 'supertest';
import { server } from '../server';
import { BASE_URL, ERROR_MESSAGES } from '../constants/constants';
import { IUserRequestData } from "../interfaces/interfaces";

export const testData: IUserRequestData = {
  username: 'Alex',
  age: 20,
  hobbies: ['basketball', 'chess'],
};

export const updatingData: IUserRequestData = {
  username: 'Polina',
  age: 21,
  hobbies: ['swimming', 'dancing'],
};

afterAll(() => {
  server.close();
});

describe('Test API methods with valid user data', () => {
  let id = '';
  let testUserWithId = {};
  let updatedUserWithId = {};

  test('Get empty list of users', async () => {
    await request(server).get(BASE_URL).expect('Content-Type', /json/).expect(200).expect([]);
  });

  test('Create new user', async () => {
    const response = await request(server)
      .post(BASE_URL)
      .send(testData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toMatchObject(testData);
    id = response.body.id;
    testUserWithId = {
      ...response.body,
    };
    expect(response.body).toEqual(testUserWithId);
  });

  test('Get created user', async () => {
    await request(server)
      .get(`${BASE_URL}/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(testUserWithId);
  });

  test('Update user', async () => {
    const response = await request(server)
      .put(`${BASE_URL}/${id}`)
      .send(updatingData)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toMatchObject(updatingData);
    updatedUserWithId = {
      ...response.body,
    };
    expect(response.body).toEqual(updatedUserWithId);
  });

  test('Get updated user', async () => {
    await request(server)
      .get(`${BASE_URL}/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(updatedUserWithId);
  });

  test('Delete user', async () => {
    await request(server).delete(`${BASE_URL}/${id}`).expect(204);
  });

  test('Try to get a deleted user', async () => {
    await request(server)
      .get(`${BASE_URL}/${id}`)
      .expect(404)
      .expect({ code: 404, message: ERROR_MESSAGES.NonExistentUserId });
  });
});
