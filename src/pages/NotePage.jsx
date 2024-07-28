import React, { useState, useEffect } from 'react';
// import { fakeData as note } from "../assets/fakeData"
import NoteCard from '../Components/NoteCard';
import { database } from '../appwrite/config';

const NotePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await database.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_NOTES_ID
    )
    setNotes(res.documents) 
  }



  return (
    <div>
      {
         notes.map(note => (
          <NoteCard key={note.$id} note={note}/>
        ))
      
      }
    </div>
  )
}

export default NotePage;
