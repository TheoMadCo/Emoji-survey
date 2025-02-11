// src/components/Results.js
import React, { useState, useEffect } from 'react';
import { loadSessions, loadQuestions, clearSessions } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

function Results() {
  const [sessions, setSessions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(loadQuestions());
    setSessions(loadSessions());
  }, []);

  const handleDownloadCSV = () => {
    // Prepara l'intestazione del CSV: "Date" + testi delle domande.
    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = ["Date", ...questions.map(q => `"${q.text}"`)];
    csvContent += headers.join(",") + "\r\n";

    sessions.forEach(session => {
      const dateStr = new Date(session.date).toLocaleString();
      const row = [ `"${dateStr}"` ];
      questions.forEach(q => {
        const answer = session.answers.find(a => a.questionId === q.id);
        row.push(answer ? answer.vote : "");
      });
      csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const now = new Date();
    const filename = `survey_results_${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}.csv`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteAll = () => {
    if (window.confirm("Sei sicuro di voler eliminare tutti i risultati? Questa operazione non può essere annullata.")) {
      clearSessions();
      setSessions([]);
    }
  };

  return (
    <div className="container">
      <h2>Risultati delle Sessioni</h2>
      {sessions.length === 0 ? (
        <p>Nessuna sessione registrata.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table aria-label="Tabella dei risultati del questionario">
            <thead>
              <tr>
                <th>Data</th>
                {questions.map((q) => (
                  <th key={q.id}>{q.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index}>
                  <td>{new Date(session.date).toLocaleString()}</td>
                  {questions.map((q) => {
                    const answer = session.answers.find(a => a.questionId === q.id);
                    return (
                      <td key={q.id}>
                        {answer ? answer.vote : '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <button
          onClick={handleDownloadCSV}
          className="btn"
          aria-label="Scarica risultati in formato CSV"
        >
          Scarica CSV
        </button>
        <button
          onClick={handleDeleteAll}
          className="btn"
          style={{ background: '#dc3545' }}
          aria-label="Elimina tutti i risultati"
        >
          Elimina Tutti
        </button>
        <button
          onClick={() => navigate('/admin')}
          className="btn"
          aria-label="Torna al pannello Admin"
          style={{ background: '#025358' }}
        >
          Indietro
        </button>
      </div>
    </div>
  );
}

export default Results;
