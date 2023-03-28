import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext';
import AlertContext from '../context/AlertContext';

const NoteItem = (props) => {
    const { deleteNote, editNote } = useContext(NoteContext);
    const { showAlert } = useContext(AlertContext);
    const { note, updateNote } = props;

    const handleDelete = (e) => {
        showAlert("Deleted successfully", "success");
        deleteNote(note._id);
    }

    const handleEdit = (note) => {
        updateNote(note);
    }
    return (
        <div className="card col-3 mx-1 my-2">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fas fa-trash-alt mx-1" onClick={handleDelete}></i>
                <i className="fas fa-edit mx-1" onClick={()=>{handleEdit(note)}}></i>
            </div>
        </div>
    )
}

export default NoteItem
