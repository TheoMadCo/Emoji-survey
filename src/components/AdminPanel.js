// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { loadQuestions, saveQuestions, clearSessions } from '../utils/storage';
import EditableQuestion from './EditableQuestion';
import { useNavigate } from 'react-router-dom';

function AdminPanel({ isAdminLoggedIn, onAdminLogin }) {
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(loadQuestions());
  }, []);

  const handleLogin = () => {
    // Controllo password hardcoded
    if (password === 'admin123') {
      onAdminLogin(true);
      setLoginError('');
    } else {
      setLoginError('Password errata');
    }
  };

  const handleAddQuestion = () => {
    if (newQuestionText.trim() === '') return;
    const newQuestion = { id: Date.now(), text: newQuestionText };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
    clearSessions(); // Reset delle sessioni poiché le domande sono cambiate
    setNewQuestionText('');
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
    clearSessions();
  };

  const handleEditQuestion = (id, newText) => {
    const updatedQuestions = questions.map(q => (q.id === id ? { ...q, text: newText } : q));
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
    clearSessions();
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="container">
        <h2>Admin Login</h2>
        <input 
          type="password" 
          placeholder="Inserisci password amministratore" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '8px', width: '80%' }}
        />
        <button onClick={handleLogin} className="btn" style={{ marginLeft: '10px' }}>
          Login
        </button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Admin Panel - Gestione Domande</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Aggiungi nuova domanda</h3>
        <input
          type="text"
          value={newQuestionText}
          onChange={e => setNewQuestionText(e.target.value)}
          placeholder="Testo della domanda"
          style={{ width: '80%', padding: '8px' }}
        />
        <button onClick={handleAddQuestion} className="btn" style={{ marginLeft: '10px' }}>
          Aggiungi
        </button>
      </div>
      <div>
        <h3>Domande Esistenti</h3>
        {questions.map((q, index) => (
          <div key={q.id} style={{ width: '100%', marginBottom: '10px' }}>
            <EditableQuestion 
              question={q} 
              onSave={handleEditQuestion} 
              onDelete={handleDeleteQuestion} 
            />
            {index < questions.length - 1 && <hr style={{ margin: '10px 0' }} />}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/results')} className="btn">
          Visualizza Risultati
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
