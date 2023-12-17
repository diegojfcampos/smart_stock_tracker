import { app } from "../../src/server";
import supertest from 'supertest';
import jwt from 'jsonwebtoken';


beforeAll(async () => {
  const address = await app.listen({
    port: 0, 
  });

  console.log(`Server listening on ${address}`);
});

afterAll(async () => {
  await app.close();
});

describe('User Tests', () => {
    
    let token: string;
    let userId: string; 
    const email = 'user@test.com'

    it('should register user', async () => {
      const response = await supertest(app.server)
        .post('/api/register')
        .send({ email: email, password: 'test123', passwordVerification: 'test123' });
  
      expect(response.status).toBe(200);    
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('token');

      userId = response.body.id
      token = response.body.token;
      
    });

  it('should retrieve all users', async () => {
    const response = await supertest(app.server)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('users');
  });

  it('should retrieve a specific user', async () => {
    const response = await supertest(app.server)
      .get(`/api/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('user');
  });

  it('should update user password', async () => {
    const response = await supertest(app.server)
      .put(`/api/user/${userId}`)
      .send({
        currentPassword: 'test123',
        newPassword: 'newPassword123',
        userName: 'newUsername',
        phoneNumber: '123456789',
        birthday: '1986-07-15T00:00:00Z',
        role: 'PREMIUM',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
 
  });

  it('should update user information', async () => {
    const response = await supertest(app.server)
      .patch(`/api/user/${userId}`)
      .send({
        userName: 'newUsername1',
        role: 'USER',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);

  });

  it('should delete a user', async () => {
    const response = await supertest(app.server)
      .delete(`/api/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('message', 'User deleted');
  });
});
