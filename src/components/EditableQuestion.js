// src/components/EditableQuestion.js
import React, { useState } from 'react';

function EditableQuestion({ question, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(question.text);

  const handleSave = () => {
    if (text.trim() === '') return;
    onSave(question.id, text);
    setEditing(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {editing ? (
        <>
          <input 
            value={text} 
            onChange={e => setText(e.target.value)} 
            style={{ padding: '4px', width: '70%' }}
          />
          <div>
            <button onClick={handleSave} className="btn" style={{ marginLeft: '5px' }}>Salva</button>
            <button
              onClick={() => {
                setEditing(false);
                setText(question.text);
              }}
              className="btn"
              style={{ marginLeft: '5px', background: '#6c757d' }}
            >
              Annulla
            </button>
          </div>
        </>
      ) : (
        <>
          <span style={{ width: '70%', textAlign: 'left' }}>{question.text}</span>
          <div>
            <button onClick={() => setEditing(true)} className="btn" style={{ marginLeft: '10px' }}>Modifica</button>
            <button onClick={() => onDelete(question.id)} className="btn" style={{ marginLeft: '5px', background: '#dc3545' }}>
              Elimina
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditableQuestion;
