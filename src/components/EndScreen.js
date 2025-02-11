// src/components/EndScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EndScreen() {
  const navigate = useNavigate();

  const handleNewSurvey = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Grazie per aver completato il questionario!</h2>
      <button onClick={handleNewSurvey} className="btn">
        Nuovo Questionario
      </button>
    </div>
  );
}

export default EndScreen;
