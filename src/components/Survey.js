import React, { useState, useEffect } from 'react';
import { loadQuestions, saveSession } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

function Survey() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedVote, setSelectedVote] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [color, setColor] = useState('#dff5f2'); // Default cyan color

  useEffect(() => {
    const qs = loadQuestions();
    setQuestions(qs);
  }, []);

  useEffect(() => {
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.backgroundColor = color;
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.transition = 'background-color 0.3s ease';
      nav.style.backgroundColor = color === '#dff5f2' ? '#507973' : color;
    }
    const container = document.querySelector('.container');
    if (container) {
      container.style.transition = 'box-shadow 0.3s ease';
      container.style.boxShadow = `0px 18px 50px -10px ${color === '#dff5f2' ? '#9fcec8' : color}`;
    }
  }, [color]);

  function getRandomColor() {
    let hue;
    do {
      hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
    } while ((hue >= 0 && hue <= 30) || (hue >= 330 && hue <= 360)); // Exclude red hues

    const saturation = Math.floor(Math.random() * 50) + 50; // Saturation between 50% and 100%
    const lightness = Math.floor(Math.random() * 30) + 40; // Lightness between 40% and 70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const emoticons = [
    { value: 1, symbol: '😡', label: 'Molto negativo', color: getRandomColor() },
    { value: 2, symbol: '☹️', label: 'Negativo', color: getRandomColor() },
    { value: 3, symbol: '😐', label: 'Neutrale', color: getRandomColor() },
    { value: 4, symbol: '🙂', label: 'Positivo', color: getRandomColor() },
    { value: 5, symbol: '😄', label: 'Molto positivo', color: getRandomColor() }
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
      setColor('#dff5f2'); // Reset to default color after answering
    } else {
      const session = {
        date: new Date().toISOString(),
        answers: newAnswers
      };
      saveSession(session);
      navigate('/end');
    }
  };

  const handleVoteSelect = (value) => {
    setSelectedVote(value);
    const emoji = emoticons.find(emo => emo.value === value);
    setColor(emoji ? emoji.color : '#dff5f2');
  };

  if (questions.length === 0) {
    return <div className="container">Caricamento domande...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
        {currentQuestion.text}
      </h1>
      <div>
        <div role="group" aria-label="Seleziona il tuo voto" style={{ marginBottom: '20px' }}>
          {emoticons.map((emo) => (
            <button
              key={emo.value}
              onClick={() => handleVoteSelect(emo.value)}
              style={{
                fontSize: '2rem',
                margin: '0 5px',
                backgroundColor: selectedVote === emo.value ? '#a2d8e2' : '#fff',
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
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', fontWeight: 'bold' }}>
          <span style={{ fontSize: '1.3rem', color: '#555' }}>
            {currentQuestion.negativeLabel}
          </span>
          <span style={{ fontSize: '1.3rem', color: '#555' }}>
            {currentQuestion.positiveLabel}
          </span>
        </div>
        {selectedVote !== null && (
          <button onClick={handleConfirm} className="btn" aria-label="Conferma la selezione">
            Conferma
          </button>
        )}
      </div>
    </div>
  );
}

export default Survey;