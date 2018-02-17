var Note = require('../models/note.model.js');

/**
 * Create and Save a note
 * @param {*} req 
 * @param {*} res 
 */
exports.create = function(req, res) {
    if(!req.body.content) {
        res.status(400).send({message: "Note can not be empty"});
    }

    var note = new Note({title: req.body.title || "Untitled Note", content: req.body.content});

    note.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the note."});
        } else {
            res.send(data);
        }
    });
};

/**
 * Retrieve and return all notes
 * @param {*} req 
 * @param {*} res
 */
exports.findAll = function(req, res) {
    Note.find(function(err, notes){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(notes);
        }
    });
};

/**
 * Find a single note by id
 * @param {*} req 
 * @param {*} res 
 */
exports.findOne = function(req, res) {
    Note.findById(req.params.noteId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve note with id " + req.params.noteId});
        } else {
            res.send(data);
        }
    });
};

/**
 * Update a note with a given id
 * @param {*} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    Note.findById(req.params.noteId, function(err, note) {
        if(err) {
            res.status(500).send({message: "Could not find a note with id " + req.params.noteId});
        }

        note.title = req.body.title;
        note.content = req.body.content;

        note.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update note with id " + req.params.noteId});
            } else {
                res.send(data);
            }
        });
    });
};

/**
 * Delete a note with a given id
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res) {
    Note.remove({_id: req.params.noteId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete note with id " + req.params.id});
        } else {
            res.send({message: "Note deleted successfully!"})
        }
    });
};

