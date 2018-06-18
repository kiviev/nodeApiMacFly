require('dotenv').config();

const Koa = require('koa');
const koaLogger = require('koa-logger');
const logger = require('logger.js');
const apiversion = process.env.API_VERSION;

// Routers
const notesApiRouter = require('routes/' + apiversion + '/note.router');

const app = new Koa();
const port = process.env.PORT;


app.use(notesApiRouter.middleware());

app.listen(port, (err) => {
    logger.info('[Server] Init');
  if (err) {
    logger.info('[Server] Init Error:', err);
  }
  console.log('Listening in port: ' + port);
});