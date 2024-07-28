import React, { useState, useEffect } from 'react';
import NoteCard from '../Components/NoteCard';  
import { db } from '../appwrite/databases';

const NotePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await db.notes.list()
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
