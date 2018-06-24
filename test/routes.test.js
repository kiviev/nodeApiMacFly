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
 let response = await request(app.callback()).get('/api/v1/notes');
 let note = response.body[response.body.length - 1];

 let newNote = {
   "text": "Esta es mi nota ",
   "favorite": false
 }
 if (note) {
   newNote.text += response.body.length
  }
  
  let responseCreate = await request(app.callback())
    .post('/api/v1/notes')
    .set('Accept', 'application/json')
    .expect(200)
    .send(newNote);
 
  let body = responseCreate.body;
  console.log(body);
 
  expect(responseCreate.status).toBe(200);
  expect(body).toEqual(expect.objectContaining({
    _id: expect.any(String),
    text: expect.any(String),
    favorite: expect.any(Boolean),
  }));

});



test('Note UpdateNote Works', async () => {

  let response = await request(app.callback()).get('/api/v1/notes');
  let note = response.body[response.body.length - 1];
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
  } else expect(true).toBe(false); // send error, note not found

});



test('Note Delete Works', async () => {

  let response = await request(app.callback()).get('/api/v1/notes');
  let note = response.body[response.body.length - 1];

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
  } else expect(true).toBe(false); // send error, note not found

});

/***********************Fav***************** */

test('Note getFavNotes Works', async () => {
  let response = await request(app.callback()).get('/api/v1/fav/');
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
    console.log(note);
    
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




