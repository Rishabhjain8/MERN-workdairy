const Note = require('../models/Note');
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/createnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();
            res.json(savedNote);
        }
        catch{
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try{
        const {title, desciption, tag} = req.body;
        const newNote = {};
        if(title) {
            newNote.title = title
        }
        if(desciption) {
            newNote.desciption = desciption
        }
        if(tag){
            newNote.tag = tag;
        }

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch{
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try{
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"message":"Note has been deleted successfully", note });
    }
    catch{
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;