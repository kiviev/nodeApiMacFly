const app = require('../server').app;
const server = require('../server').server;
const request = require('supertest');

const closeMongoConnection = require('./closeMongoConnection');



afterAll(async function (done) {
  await server.close();
  await closeMongoConnection();

  done();
});

test('Note getFavNotes Works', async () => {
  let response = await request(app.callback()).get('/api/v1/fav/');
  let body = response.body;
  expect(response.status).toBe(200);
  expect(response.type).toEqual("application/json");
  expect(Array.isArray(body)).toBe(true);
  if (Array.isArray(body) && body.length > 0) {
    for (const key in body) {
      expect(body[key]).toEqual(expect.objectContaining({
        _id: expect.any(String),
        text: expect.any(String),
        favorite: expect.any(Boolean),
      }))
    }
  }

});


test('Note SetFavNote Works', async () => {

  let response = await request(app.callback()).get('/api/v1/notes');
  let note = response.body[response.body.length - 1];
  if (note) {
    let response = await request(app.callback())
      .put('/api/v1/fav/' + note._id)
      .set('Accept', 'application/json')
      .expect(200);

    let body = response.body;

    expect(response.status).toBe(200);
    expect(body).toEqual(expect.objectContaining({
      _id: expect.any(String),
      text: expect.any(String),
      favorite: expect.any(Boolean),
    }));
  } else expect(true).toBe(false); // send error, note not found

});


test('Note DeleteFavNote Works', async () => {

  let response = await request(app.callback()).get('/api/v1/notes');
  let note = response.body[response.body.length - 1];
  if (note) {

    let response = await request(app.callback())
      .post('/api/v1/fav/' + note._id)
      .set('Accept', 'application/json')
      .expect(200);

    let body = response.body;

    expect(response.status).toBe(200);
    expect(body).toEqual(expect.objectContaining({
      _id: expect.any(String),
      text: expect.any(String),
      favorite: expect.any(Boolean),
    }));
  } else expect(true).toBe(false); // send error, note not found

});
