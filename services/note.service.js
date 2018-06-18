const logger = require('logger');
const NotFoundError = require('errors/not-found-error');
const DuplicateNoteError = require('errors/duplicate-note-error');


class NoteService {
    static async getNotes() {
        logger.info('[NoteService]@getNotes');
        return '[NoteService]@getNotes';
    }

    static async getNoteById(id) {
        logger.info('[NoteService]@getNoteById');
        return '[NoteService]@getNoteById ' + id;
    }

    static async createNote(body) {
        logger.info('[NoteService]@createNote');
        return '[NoteService]@createNote';
    }

    static async updateNoteById(id, body) {
        logger.info('[NoteService]@updateNoteById');
        return '[NoteService]@updateNoteById ' + id;
    }

    static async deleteNote(id) {
        logger.info('[NoteService]@deleteNote');
        return '[NoteService]@deleteNote 0 + id';
    }

    static async setFavNote(id) {
        logger.info('[NoteService]@setFavNote');
        return '[NoteService]@setFavNote ' + id;
    }

}


module.exports = NoteService;