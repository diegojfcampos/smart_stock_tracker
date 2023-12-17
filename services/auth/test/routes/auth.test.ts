// auth.test.js
import { app } from "../../src/server";
import supertest from 'supertest';

beforeAll(async () => {
  const address = await app.listen({
    port: 0, 
  });

  console.log(`Server listening on ${address}`);
});

afterAll(async () => {
  await app.close();
});

describe('Authentication Tests', () => {

  const email = 'test@auth.com'

  it('should authenticate user', async () => {
    const response = await supertest(app.server)
      .post('/api/auth')
      .send({ email: email, password: 'test123' });

    expect(response.status).toBe(200);    
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('token');
    
  });

  it('should return an error for non-existent user', async () => {
    const response = await supertest(app.server)
      .post('/api/auth')
      .send({ email: 'nonexistent@email.com', password: 'somepassword' });
  
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ status: false, message: "User doesn't exists" });
  });
  
  it('should return an error for wrong password', async () => {
    const response = await supertest(app.server)
      .post('/api/auth')
      .send({ email: email, password: 'wrongpassword' });
  
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ status: false, message: "Wrong password" });
  });  

});
