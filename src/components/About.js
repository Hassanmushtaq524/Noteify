import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'

const About = () => {
    const a = useContext(NoteContext);
    return (
        <div>
            This is About 
        </div>
    )
}

export default About
