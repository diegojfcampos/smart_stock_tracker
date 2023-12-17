import { app } from "../src/server";
import supertest from 'supertest';


beforeAll(async () => {
  const address = await app.listen({
    port: 0, 
  });

  console.log(`Server listening on ${address}`);
});

afterAll(async () =>{
  await app.close();
});

describe('Testing Application Server', () => {
  
  it('should get main route /', async () => {

    const response = await supertest(app.server).get('/').redirects(1);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ Server_Status: 'Running  => http://0.0.0.0:3001/api/doc' });
  });

  it('should get Swagger route /api/doc', async () => {

    const response = await supertest(app.server).get('/api/doc').redirects(1);
  
    expect(response.status).toBe(200);
  });
  
});
