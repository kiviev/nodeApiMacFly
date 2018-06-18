const KoaRouter = require('koa-router');
const logger = require('logger.js');

const router = new KoaRouter({
  prefix: process.env.API_VERSION + '/notes'
});

class NoteRouter{

    static async getNotes(ctx) {
        logger.info('[API-NoteRouter]@getNotes');
        ctx.body = 'getNotes';
    }

    static async getNoteById(ctx) {
       logger.info('[API-NoteRouter]@getNoteById');
       ctx.body = 'getNoteById';
    }
    
    static async createNote(ctx) {
        logger.info('[API-NoteRouter]@createNote');
        ctx.body = 'createNote';
    }

    static async updateNote(ctx) {
        logger.info('[API-NoteRouter]@updateNote');
        ctx.body = 'updateNote';
    }

    static async deleteNote(ctx) {
      logger.info('[API-NoteRouter]@deleteNote');
      ctx.body = 'deleteNote';
    }

    static async setFavNote(ctx) {
        logger.info('[API-NoteRouter]@setFavNote');
        ctx.body = 'setFavNote';
    }

}

router.get('/', NoteRouter.getNotes);
router.get('/:id', NoteRouter.getNoteById);
router.post('/', NoteRouter.createNote);
router.put('/:id', NoteRouter.updateNote);
router.put('/fav/:id', NoteRouter.setFavNote);
router.delete('/:id', NoteRouter.deleteNote);

module.exports = router;