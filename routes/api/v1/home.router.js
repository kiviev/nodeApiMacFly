const KoaRouter = require('koa-router');
const logger = require('logger.js');
const NoteService = require('services/note.service');


const router = new KoaRouter({
  prefix: process.env.API_VERSION + '/'
});

class HomeRouter {

  static async getNotes(ctx) {
    logger.info('[API-HomeRouter]@getNotes');
    ctx.body = {
        statusCode : 400,
        msg:'Api Notes'
    };
  }
}



router.get('/', HomeRouter.getNotes);


module.exports = router;