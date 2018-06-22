const NoteModel = require('models/note.model');
const logger = require('logger');


class NoteValidator {

  static async new(body) {
    logger.debug('[NoteValidator]@new');

    let note = {
        title: body.title ? body.title : undefined,
        text: body.text ? body.text : undefined,
        favorite: body.favorite ? body.favorite : undefined,

    }
    note = new NoteModel(note);
    return note;
  }


}


module.exports = NoteValidator;