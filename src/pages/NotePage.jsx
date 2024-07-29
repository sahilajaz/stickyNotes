import NoteCard from '../Components/NoteCard';  
import { useContext } from 'react';
import { NoteContext } from '../Context/NoteContext';
import Controls from '../Components/Controls';

const NotePage = () => {
  const{notes} = useContext(NoteContext)
  return (
    <div>
      {
         notes.map(note => (
          <NoteCard key={note.$id} note={note}/>
        ))
      
      }
      <Controls/> 
    </div>
  )
}

export default NotePage;
