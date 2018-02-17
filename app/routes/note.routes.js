module.exports = function(app) {

    var notes = require('../controllers/note.controller.js');

    // Create a note
    app.post('/notes', notes.create);

    // Retrieve all notes
    app.get('/notes', notes.findAll);

    // Retrieve a single note by id
    app.get('/notes/:noteId', notes.findOne);

    // Update a note with a given id
    app.put('/notes/:noteId', notes.update);

    // Delete a note with a given id
    app.delete('/notes/:noteId', notes.delete);
}