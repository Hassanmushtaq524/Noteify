import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = () => {
    const {addNote} = useContext(NoteContext);
    const [note, setnote] = useState({title: "", description: "", tag: ""});


    // the note is added to our NoteState
    const handleClick = (e) => {
        // the page doesn't reload
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    
    // changing the note being written
    const onChange = (e) => {
        setnote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <h2 className="my-2" >Add a Note</h2>
            <form className="my-2">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control my-2" id="title" name="title" aria-describedby="title" placeholder="Enter title" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control my-2" id="description"  name="description" placeholder="Enter description" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input className="form-control my-2" id="tag"  name="tag" placeholder="Enter description" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary my-2" onClick={handleClick}>Add</button>
            </form>
        </>
    )

}

export default AddNote