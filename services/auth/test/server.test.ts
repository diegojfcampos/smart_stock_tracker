import { app } from "../src/server";
import supertest from 'supertest';

// This function will start the server before running tests
beforeAll(async () => {
  const address = await app.listen({
    port: 0, // 0 indicates that the OS should pick a random available port
  });

  console.log(`Server listening on ${address}`);
});

// This function will close the server after all tests are complete
afterAll(async () => {
  await app.close();
});

describe('Testing Application Server', () => {
  it('should get main route /', async () => {
    const response = await supertest(app.server).get('/'); // Use app.server to get the underlying http.Server

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ Server_Status: 'Running  => http://0.0.0.0:3001/api/doc' });
  });
});
