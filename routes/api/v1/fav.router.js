const KoaRouter = require('koa-router');
const logger = require('logger.js');
const NoteService = require('services/note.service');


const router = new KoaRouter({
  prefix: process.env.API_VERSION + '/fav'
});

class FavRouter {


  static async getFavsNotes(ctx) {
    logger.info('[API-FavRouter]@getFavsNotes');
    ctx.body = await NoteService.getFavsNotes(ctx);
  }

  static async setFavNote(ctx) {
    logger.info('[API-FavRouter]@setFavNote');
    ctx.body = await NoteService.setFavNote(ctx.params.id);
  }

  static async deleteFavNote(ctx) {
    logger.info('[API-FavRouter]@deleteFavNote');
    ctx.body = await NoteService.deleteFavNote(ctx.params.id);
  }

}


router.get('/', FavRouter.getFavsNotes);
router.put('/:id', FavRouter.setFavNote);
router.post('/:id', FavRouter.deleteFavNote);



module.exports = router;