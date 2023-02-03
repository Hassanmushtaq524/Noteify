const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');


// ROUTE 1
// Create a note using POST: "/api/notes" LOGIN REQUIRED
router.post("/createnote",
    [body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 })],
    fetchuser,
    async (req, res) => {

        // validating our request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            let { title, description, tag } = req.body;

            const note = await Notes.create({
                user: req.user.id,
                title: title,
                description: description,
                tag: tag
            })

            return res.send(note);

        } catch (error) {

            console.log(error);
            return res.status(500).send("Internal Server Error.");
        }



    })


// ROUTE 2
// get all notes using GET: "/api/notes/fetchallnotes" LOGIN REQUIRED
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        return res.json(notes);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error.");
    }
})


// ROUTE 3
// Update existing notes using PUT: "/api/notes/updatenote/:id" LOGIN REQUIREd
router.put("/updatenote/:id", fetchuser, async (req, res) => {

    try {
        // parse body
        let { title, description, tag } = req.body;


        // create a new note
        let newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = description;

        // check if note exists with passed id
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send("Not found");
        // check if the user id is the same as current id passed in token
        if (note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

        // update note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.send(note);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error.");
    }

})

// ROUTE 4
// Delete a note using its id DELETE: "/api/notes/deletenote/:id" LOGIN REQUIRED
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    try {
        // get the note
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send("Not found");
        // check if the user id is the same as current id passed in token
        if (note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

        await Notes.findByIdAndDelete(req.params.id);
        return res.json({Success: "Note deleted"});

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error.");
    }


})


module.exports = router;