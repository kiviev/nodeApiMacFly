const app = require('../server').app;
const server = require('../server').server;
const request = require('supertest');

const closeMongoConnection = require('./closeMongoConnection');



afterAll(async function (done) {
  await server.close();
  await closeMongoConnection();

  done();
});

test('Home Api Works', async () => {
  let response = await request(app.callback()).get('/api/v1/');

  expect(response.status).toBe(200);
  expect(response.type).toEqual("application/json");
  expect(response.body).toEqual({
    statusCode: 400,
    msg: 'Api Notes'
  });
});
