import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    let { notes, getAllNotes, editNote } = useContext(NoteContext);
    const defaultNote = {title: "", description: "", tag: ""};
    let [note, setNote] = useState(defaultNote);
    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        getAllNotes();
        // es-lint-disable-next-line
    }, [])

    // updateNote toggles the modal, and displays the note data of note clicked
    // note passed from NoteItem component
    const updateNote = (note) => {
        ref.current.click();
        setNote(note);
    }

    // onChange changes the note as it is typed
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    // handleClick calls the editNote function in the NoteContext
    const handleClick = () => {
        refClose.current.click();
        editNote(note._id, note.title, note.description, note.tag);
    }
    return (
        <>
            <button type="button" hidden={true} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
            </button>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                        </div>
                        <div className="modal-body">
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setNote(defaultNote)}} ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2>Your Notes</h2>
                <div className="my-3 row">
                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
