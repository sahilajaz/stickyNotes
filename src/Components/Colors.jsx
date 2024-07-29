import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";

const Colors = ({ color }) => {
  const { selectedNote, setSelectedNote, notes, setNotes } = useContext(NoteContext);

  const changeColor = () => {
    if (!selectedNote) {
      alert("You must select a note before changing color and drag it a big.");
      return;
    }

    try {
      // Find the index of the selected note
      const currentIndex = notes.findIndex((note) => note.$id === selectedNote.$id);

      if (currentIndex === -1) {
        alert("Selected note not found in the list.");
        return;
      }

      // Update the note's colors property
      const updatedNote = {
        ...notes[currentIndex],
        colors: JSON.stringify(color),
      };

      // Create a new notes array with the updated note
      const newNotes = [...notes];
      newNotes[currentIndex] = updatedNote;

      // Update the notes in the context
      setNotes(newNotes);

    } catch (error) {
      console.error("Error changing color:", error);
      alert("Failed to change color.");
    }
  };

  return (
    <div
      className='color'
      onClick={changeColor}
      style={{ backgroundColor: color.colorHeader }}
    >
    </div>
  );
};

export default Colors;
