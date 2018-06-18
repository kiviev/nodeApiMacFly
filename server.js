require('dotenv').config();

const Koa = require('koa');
const koaLogger = require('koa-logger');
const logger = require('logger.js');


const app = new Koa();
const port = process.env.PORT;

app.listen(port, (err) => {
    logger.info('[Server] Init');
  if (err) {
    // console.log(err);
  }
  console.log('Listening in port: ' + port);
});