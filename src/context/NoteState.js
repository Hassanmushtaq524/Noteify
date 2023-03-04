import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const noteInit = [{
        title: "Clean",
        description: "Clean the room"
      },
      {
        title: "Study",
        description: "Study some shi"
      }];
    

    let [notes, setNotes] = useState(noteInit);

    return (
        <NoteContext.Provider value={{notes: notes, setNotes: setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;