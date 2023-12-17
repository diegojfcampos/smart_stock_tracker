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


describe('Register User Tests', () => {

    let token: string;
    let userId: string; 
    

    it('should register user', async () => {
      const response = await supertest(app.server)
        .post('/api/register')
        .send({ email: 'test@test.com', password: 'test123', passwordVerification: 'test123' });
  
      expect(response.status).toBe(200);    
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('token');

      userId = response.body.id
      token = response.body.token;
      
    });

      it('should return an error for password dont match', async () => {
        const response = await supertest(app.server)
          .post('/api/register')
          .send({email: 'test@test.com', password: 'test123', passwordVerification: 'test1234' });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ status: false, message: "Passwords don't match" });    
        
      });


      it('should return an error for user already exists', async () => {
        const response = await supertest(app.server)
          .post('/api/register')
          .send({email: 'test@test.com', password: 'test123', passwordVerification: 'test123' });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ status: false, message: "User already registered" });    
        
      });
      
      it('should delete the user', async () =>{
        const response = await supertest(app.server).delete(`/api/user/${userId}`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({status: true, message: "User deleted"})

      })
  
  });
  