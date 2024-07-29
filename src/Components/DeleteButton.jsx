import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);

  const handleDelete = async () => {
    try {
      await db.notes.delete(noteId);
      setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
