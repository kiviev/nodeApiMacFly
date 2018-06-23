const KoaRouter = require('koa-router');
const logger = require('logger.js');
const NoteService = require('services/note.service');


const router = new KoaRouter({
  prefix: process.env.API_VERSION + '/'
});

class HomeRouter {

  static async getHome(ctx) {
    logger.info('[API-HomeRouter]@getHome');
    ctx.body = {
        statusCode : 400,
        msg:'Api Notes'
    };
  }
}



router.get('/', HomeRouter.getHome);


module.exports = router;