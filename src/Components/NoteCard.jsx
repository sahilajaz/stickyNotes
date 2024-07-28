import React, { useRef, useEffect, useState, useCallback } from 'react';
import Trash from '../icons/Trash';
import { setNewOffSet, autoGrow, setZIndex, bodyParser } from '../utilis';

const NoteCard = ({ note }) => {
  console.log('Note:', note);

  const body = bodyParser(note.body);
  console.log('Parsed body:', body);

  // Handle both "position" and "positon" fields
  const rawPosition = note.position || note.positon;
  console.log('Note position (raw):', rawPosition);
  console.log('Note colors (raw):', note.colors);

  // Safe JSON parsing function
  const safeJSONParse = (jsonString, fallback) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to parse JSON:', error, jsonString);
      return fallback;
    }
  };

  // Parse position and colors safely
  const initialPosition = safeJSONParse(rawPosition, { x: 0, y: 0 });
  const colors = safeJSONParse(note.colors, { colorBody: '#fff', colorHeader: '#ccc', colorText: '#000' });

  // Log parsed values
  console.log('Parsed Position:', initialPosition);
  console.log('Parsed Colors:', colors);

  const [position, setPosition] = useState(initialPosition);
  const mouseStartPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      console.log('Textarea element:', textAreaRef.current);
      autoGrow(textAreaRef.current);
    } else {
      console.warn('Textarea element is not available');
    }
  }, []);

  const mouseDown = useCallback((e) => {
    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    setZIndex(cardRef.current);
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
  }, []);

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
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef.current)}
          onClick={() => setZIndex(cardRef.current)}
        />
      </div>
    </div>
  );
};

export default NoteCard;
