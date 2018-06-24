const logger = require('logger');
const NotFoundError = require('errors/not-found-error');
const DuplicateNoteError = require('errors/duplicate-note-error');
const NoteModel = require('models/note.model');
const NoteValidator = require('validators/note.validator');


class NoteService {
    static async getNotes() {
        logger.info('[NoteService]@getNotes');
        const filter = {};
        return NoteModel.find(filter).select("-__v");
    }

    static async getNoteById(id) {
        logger.info('[NoteService]@getNoteById');
        try {
            const note = await NoteModel.findById(id).select("-__v");
            if (!note) {
              throw new NotFoundError('Note not found');
            }
            return note
            
        } catch (error) {
            throw new NotFoundError('Note not found');
        }
    }

    static async createNote(body) {
        logger.info('[NoteService]@createNote');

        let note = await NoteValidator.new(body);
        if (note) {
            await note.save();
            
            return note;
        } else {
            logger.error('[NoteService]@createNote', 'Note not saved');
            throw new NotFoundError('Create Note not found');
        }
    }

    static async updateNoteById(id, body) {
        logger.info('[NoteService]@updateNoteById');
        const note = await NoteService.getNoteById(id);
        note.title = body.title;
        note.text = body.text;
        note.favorite = body.favorite;

        await note.save();

        return note;
    }

    static async deleteNote(id) {
        logger.info('[NoteService]@deleteNote');
        const note = await NoteService.getNoteById(id);
        
        if (note) {
            note.remove();
            return note;
        }
        throw new NotFoundError('Delete note not found');
    }

    static async getFavsNotes(ctx) {
      logger.info('[NoteService]@getFavsNotes');
      const filter = {
          favorite: true
      };
      return NoteModel.find(filter).select("-__v");
    }

    static async setFavNote(id) {
       logger.info('[NoteService]@setFavNote');
       const note = await NoteService.getNoteById(id);
       note.favorite = true;
       await note.save();

       return note;
     }

    static async deleteFavNote(id) {
        logger.info('[NoteService]@deleteFavNote');
        const note = await NoteService.getNoteById(id);
        note.favorite = false;
        await note.save();

        return note;
    }

}


module.exports = NoteService;