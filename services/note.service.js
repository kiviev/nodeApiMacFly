const logger = require('logger');
const NotFoundError = require('errors/not-found.error');
const DuplicatenoteError = require('errors/duplicate-note.error');

const NoteModel = require('models/note.model');

class NoteService {
    static async getNotes() {
      logger.info('[NoteService]@getNotes');
    }

    static async getNoteById(id) {
    }

    static async createNote(body) {
      logger.info('[NoteService]@createNote');
    }

    static async updateNoteById(id, body) {
      logger.info('[NoteService]@updateNoteById');
    }

    static async deleteNote(id) {
      logger.info('[NoteService]@deleteNote');
    }

    static async setFavNote(id) {
      logger.info('[NoteService]@setFavNote');
    }

}


module.exports = NoteService;