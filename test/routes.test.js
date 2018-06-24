const app = require('../server');
const request = require('supertest');
const  mongoose = require('mongoose');

const closeMongoConnection = require('./closeMongoConnection');

var nuevanota = {};

afterAll(async (done) => {
  // await closeMongoConnection();
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

/***********************Notes***************** */


test('Note getNotes Works', async () => {
  let response = await request(app.callback()).get('/api/v1/notes');
  let body = response.body;
  expect(response.status).toBe(200);
  expect(response.type).toEqual("application/json");
  expect(Array.isArray(body)).toBe(true);
  if (Array.isArray(body) && body.length > 0){
    for (const key in body) {
      expect(body[key]).toEqual(expect.objectContaining({
        _id: expect.any(String),
        text: expect.any(String),
        favorite: expect.any(Boolean),
      }))
    }
  }
  
});

test('Note CreateNote Works', async () => {
  let qb = {
    "text": "Esta es mi 12 nota",
    "favorite": false
  }
  let response = await request(app.callback())
    .post('/api/v1/notes')
    .set('Accept', 'application/json')
    .expect(200)
    .send(qb);

  let body = response.body;
  console.log(body);

  expect(response.status).toBe(200);
  expect(body).toEqual(expect.objectContaining({
    _id: expect.any(String),
    text: expect.any(String),
    favorite: expect.any(Boolean),
  }));
});



test('Note UpdateNote Works', async () => {

  let response = await request(app.callback()).get('/api/v1/notes');
  let note = response.body[response.body.length - 1];
  console.log('xxxxxxxxxxx');
  if (note) {
    note.title = "titulo actualizado";
    note.text = "Texto actualizado";

    let response = await request(app.callback())
      .put('/api/v1/notes/' + note._id)
      .set('Accept', 'application/json')
      .expect(200)
      .send(note);
    let body = response.body;

    expect(response.status).toBe(200);
    expect(body).toEqual(expect.objectContaining({
      _id: expect.any(String),
      text: expect.any(String),
      favorite: expect.any(Boolean),
    }));
  }

});



test('Note Delete Works', async () => {

  let response = await request(app.callback()).get('/api/v1/notes');
  let note = response.body[response.body.length - 1];
  console.log('xxxxxxxxxxx');
  if (note) {
    let response = await request(app.callback())
      .delete('/api/v1/notes/' + note._id)
      .set('Accept', 'application/json')
      .expect(200)
      .send(note);
    let body = response.body;

    expect(response.status).toBe(200);
    expect(body).toEqual(expect.objectContaining({
      _id: expect.any(String),
      text: expect.any(String),
      favorite: expect.any(Boolean),
    }));
  }

});


