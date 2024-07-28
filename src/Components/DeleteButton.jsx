import Trash from "../icons/Trash"
import { db } from "../appwrite/databases"
const DeleteButton = ({noteId , setNOtes}) => {
    
   const handleDelete =  () => {
    db.notes.delete(noteId)
      setNOtes((prevState) => 
     prevState.filter((note) => note.$id !== noteId)
     
    )
   }

  return (
    <div onClick={handleDelete}><Trash/></div>
  )
}

export default DeleteButton
