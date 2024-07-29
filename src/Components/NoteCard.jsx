import React, { useRef, useEffect, useState, useCallback } from 'react';
import DeleteButton from './DeleteButton';
import { setNewOffSet, autoGrow, setZIndex, bodyParser} from '../utilis';
import { db } from '../appwrite/databases';
import Spinner from '../icons/Spinner';
import { useContext } from 'react';
import { NoteContext } from '../Context/NoteContext';


const NoteCard = ({ note}) => {
  const{setNote} = useContext(NoteContext)
  const[saving , setSaving] = useState(false)
  const keyUpTimer = useRef(null)
  const body = bodyParser(note.body);
  const rawPosition = note.position || note.positon;
  const {setSelectedNote} = useContext(NoteContext)
  
  const safeJSONParse = (jsonString, fallback) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to parse JSON:', error, jsonString);
      return fallback;
    }
  }
  
  const initialPosition = safeJSONParse(rawPosition, { x: 0, y: 0 });
  const colors = safeJSONParse(note.colors, { colorBody: '#fff', colorHeader: '#ccc', colorText: '#000' });

  const [position, setPosition] = useState(initialPosition);
  const mouseStartPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef.current);
      setZIndex(cardRef.current)
    } else {
      console.warn('Textarea element is not available');
    }
  }, []);

  const mouseDown = useCallback((e) => {
    if(e.target.className === "card-header") {
    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    setZIndex(cardRef.current);
    setSelectedNote(note)
    }
  }, []);

  const mouseMove = useCallback((e) => {
    const mouseMoveDir = {
      x: mouseStartPos.current.x - e.clientX,
      y: mouseStartPos.current.y - e.clientY,
    };
    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    const newPosition = setNewOffSet(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  }, []);

  const mouseUp = useCallback(() => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);

    const newPosition = setNewOffSet(cardRef.current)
    saveData("positon" ,  newPosition)
  }, []);

   const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
        await db.notes.update(note.$id, payload);
    } catch (error) {
        console.error(error);
    }
    setSaving(false)
}

const handleKeyUp = () => {
    setSaving(true) 

    if(keyUpTimer.current) [
           clearTimeout(keyUpTimer.current)
    ]

    keyUpTimer.current= setTimeout(() => {
      saveData("body" , textAreaRef.current.value)
    }, 2000)
}

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton  noteId={note.$id}/>
        {
        saving && (
        <div className="card-saving">
            <span style={{ color: colors.colorText }}><Spinner color={colors.colorText}/> Saving...</span>
        </div>
      )
    }
      </div>
      <div className="card-body">
        <textarea
        onKeyUp={handleKeyUp}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef.current)}
          onClick={() => setZIndex(cardRef.current)}
          onFocus={()=> {setSelectedNote(note)}}
        />
      </div>
    </div>
  );
};

export default NoteCard;
