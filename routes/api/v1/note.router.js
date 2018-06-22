const KoaRouter = require('koa-router');
const logger = require('logger.js');
const NoteService = require('services/note.service');


const router = new KoaRouter({
  prefix: process.env.API_VERSION + '/notes'
});

class NoteRouter{

    static async getNotes(ctx) {
        logger.info('[API-NoteRouter]@getNotes');
        ctx.body = await NoteService.getNotes();
    }

    static async getNoteById(ctx) {
       logger.info('[API-NoteRouter]@getNoteById');
       ctx.body = await NoteService.getNoteById(ctx.params.id);
    }
    
    static async createNote(ctx) {
        logger.info('[API-NoteRouter]@createNote');        
        ctx.body = await NoteService.createNote(ctx.request.body);
    }

    static async updateNote(ctx) {
        logger.info('[API-NoteRouter]@updateNote');
        ctx.body = await NoteService.updateNoteById(ctx.params.id, ctx.request.body);
    }

    static async deleteNote(ctx) {
      logger.info('[API-NoteRouter]@deleteNote');
      ctx.body = await NoteService.deleteNote(ctx.params.id);
    }
    

}



router.get('/', NoteRouter.getNotes);
router.get('/:id', NoteRouter.getNoteById);
router.post('/', NoteRouter.createNote);
router.put('/:id', NoteRouter.updateNote);
router.delete('/:id', NoteRouter.deleteNote);


module.exports = router;