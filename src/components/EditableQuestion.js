import React, { useState } from 'react';

function EditableQuestion({ question, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(question.text);
  const [negativeLabel, setNegativeLabel] = useState(question.negativeLabel || '');
  const [positiveLabel, setPositiveLabel] = useState(question.positiveLabel || '');

  const handleSave = () => {
    if (text.trim() === '') return;
    onSave(question.id, text, negativeLabel, positiveLabel);
    setEditing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginBottom: '10px' }}>
      {editing ? (
        <>
          <input 
            value={text} 
            onChange={e => setText(e.target.value)}
            style={{ padding: '4px', width: '100%', marginBottom: '5px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <input 
              value={negativeLabel} 
              onChange={e => setNegativeLabel(e.target.value)}
              placeholder="Etichetta negativa"
              style={{ width: '48%', padding: '4px' }}
            />
            <input 
              value={positiveLabel} 
              onChange={e => setPositiveLabel(e.target.value)}
              placeholder="Etichetta positiva"
              style={{ width: '48%', padding: '4px' }}
            />
          </div>
          <div>
            <button onClick={handleSave} className="btn" style={{ marginRight: '5px' }}>
              Salva
            </button>
            <button onClick={() => { setEditing(false); setText(question.text); setNegativeLabel(question.negativeLabel); setPositiveLabel(question.positiveLabel); }} 
              className="btn" style={{ background: '#6c757d' }}>
              Annulla
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ flex: 1 }}>{question.text}</span>
            <div>
              <button onClick={() => setEditing(true)} className="btn" style={{ marginLeft: '10px' }}>
                Modifica
              </button>
              <button onClick={() => onDelete(question.id)} className="btn" style={{ marginLeft: '5px', background: '#dc3545' }}>
                Elimina
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>
            <span>{question.negativeLabel}</span>
            <span>{question.positiveLabel}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default EditableQuestion;