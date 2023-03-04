import React, {useContext} from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    let { notes, setNotes } = useContext(NoteContext);

    return (
        <div className="my-3 row">
            {notes.map((note) => {
                return <NoteItem note={note}/>
            })}
        </div>
    )
}

export default Notes
