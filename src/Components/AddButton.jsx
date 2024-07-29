import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef, useContext } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../Context/NoteContext";

const AddButton = () => {
  const { setNotes } = useContext(NoteContext);
  const startingPoint = useRef(10);

  const addNote = async () => {
    const payload = {
        positon: JSON.stringify({
        x: startingPoint.current,
        y: startingPoint.current,
      }),
      colors: JSON.stringify(colors[0]),
    };
    startingPoint.current += 10;

    try {
      const response = await db.notes.create(payload);
      setNotes((prevState) => [response, ...prevState]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
