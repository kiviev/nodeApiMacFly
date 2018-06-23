require('dotenv').config();
const config = require('config/config');

const Koa = require('koa');
const koaLogger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const logger = require('logger.js');
const apiversion = process.env.API_VERSION;

// Routers
const homeApiRouter = require('routes/' + apiversion + '/home.router');
const notesApiRouter = require('routes/' + apiversion + '/note.router');
const favApiRouter = require('routes/' + apiversion + '/fav.router');

const app = new Koa();
const port = process.env.PORT;

function onDBready(err) {
  if (err) {
    logger.error('Error conection: ', err);
    process.exit(1);
  }

}
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);
    if (error.statusCode) {
      ctx.throw(error.statusCode, error.message);
    }
  }

});



app.use(homeApiRouter.middleware());
app.use(notesApiRouter.middleware());
app.use(favApiRouter.middleware());

app.listen(port, (err) => {
    logger.info('[Server] Init');
  if (err) {
    logger.info('[Server] Init Error:', err);
  }
  console.log('Listening in port: ' + port);
});

mongoose.connect(getMongoUri(config.dbuse), onDBready);




function getMongoUri(mongoconfig) {
  let conf = config.db[mongoconfig];
  let uri = '';
  switch (mongoconfig) {
    case 'mongo':
      uri = 'mongodb://' + conf.uri + ':' + conf.port + '/' + conf.dbname;
      break;
    case 'mongolab':
      uri = 'mongodb://' + conf.user + ':' + conf.password + '@' + conf.uri + ':' + conf.port + '/' + conf.dbname;
      break;
    default:
      logger.error('No Uri mongo');
      break;
  }
  logger.info('CONEXION to MONGO', mongoconfig, 'in:', uri)
  return uri;
}



module.exports = app;