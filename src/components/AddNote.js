import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = () => {
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });


    // the note is added to our NoteState
    const handleClick = (e) => {
        // the page doesn't reload
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }

    // changing the note being written
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container my-3">
                <h2 className="my-2" >Add a Note</h2>
                <form className="my-2">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input className="form-control my-2" id="title" name="title" aria-describedby="title" placeholder="Enter title" onChange={onChange} value={note.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input className="form-control my-2" id="description" name="description" placeholder="Enter description" onChange={onChange} value={note.description}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input className="form-control my-2" id="tag" name="tag" placeholder="Enter tag" onChange={onChange} value={note.tag}/>
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5}type="submit" className="btn btn-primary my-2" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )

}

export default AddNote