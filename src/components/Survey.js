// src/components/Survey.js
import React, { useState, useEffect } from 'react';
import { loadQuestions, saveSession } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

function Survey() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedVote, setSelectedVote] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const qs = loadQuestions();
    setQuestions(qs);
  }, []);

  // Definizione delle faccine con etichette per l'accessibilità.
  const emoticons = [
    { value: 1, symbol: '😡', label: 'Molto negativo' },
    { value: 2, symbol: '☹️', label: 'Negativo' },
    { value: 3, symbol: '😐', label: 'Neutrale' },
    { value: 4, symbol: '🙂', label: 'Positivo' },
    { value: 5, symbol: '😄', label: 'Molto positivo' }
  ];

  const handleConfirm = () => {
    if (selectedVote === null) return;
    const question = questions[currentQuestionIndex];
    const answer = {
      questionId: question.id,
      vote: selectedVote,
      timestamp: Date.now()
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedVote(null);
    } else {
      // Salva la sessione e reindirizza alla schermata finale.
      const session = {
        date: new Date().toISOString(),
        answers: newAnswers
      };
      saveSession(session);
      navigate('/end');
    }
  };

  if (questions.length === 0) {
    return <div className="container">Caricamento domande...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      {/* La domanda corrente in evidenza */}
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          marginTop: '20px'
        }}
      >
        {currentQuestion.text}
      </h1>
      <div>
        <div
          role="group"
          aria-label="Seleziona il tuo voto"
          style={{ marginBottom: '20px' }}
        >
          {emoticons.map((emo) => (
            <button
              key={emo.value}
              onClick={() => setSelectedVote(emo.value)}
              style={{
                fontSize: '2rem',
                margin: '0 5px',
                backgroundColor: selectedVote === emo.value ? 'lightblue' : 'white',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              aria-label={emo.label}
            >
              {emo.symbol}
            </button>
          ))}
        </div>
        {/* Il bottone viene mostrato solo se è stata selezionata una risposta */}
        {selectedVote !== null && (
          <button
            onClick={handleConfirm}
            className="btn"
            aria-label="Conferma la selezione"
          >
            Conferma
          </button>
        )}
      </div>
    </div>
  );
}

export default Survey;
