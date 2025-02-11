// src/utils/storage.js
const DEFAULT_QUESTIONS = [
  { id: 1, text: 'Quanto hai apprezzato il gioco del calcolo a mente?' },
  { id: 2, text: 'Quanto era difficile per te il gioco del calcolo a mente?' },
  { id: 3, text: 'Quanto hai apprezzato il gioco del calcolo in colonna?' },
  { id: 4, text: 'Quanto era difficile per te il gioco del calcolo in colonna?' },
  { id: 5, text: 'Quanto hai apprezzato il gioco dei blocchi numerati?' },
  { id: 6, text: 'Quanto era difficile per te il gioco dei blocchi numerati?' },
  { id: 7, text: 'Quanto preferisci fare matematica giocando con la realtà virtuale?' },
  { id: 8, text: 'Quanto eri concentrato sugli esercizi?' },
];

export const loadQuestions = () => {
  const stored = localStorage.getItem('questions');
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem('questions', JSON.stringify(DEFAULT_QUESTIONS));
    return DEFAULT_QUESTIONS;
  }
};

export const saveQuestions = (questions) => {
  localStorage.setItem('questions', JSON.stringify(questions));
};

export const loadSessions = () => {
  const stored = localStorage.getItem('sessions');
  return stored ? JSON.parse(stored) : [];
};

export const saveSession = (session) => {
  const sessions = loadSessions();
  sessions.push(session);
  localStorage.setItem('sessions', JSON.stringify(sessions));
};

export const clearSessions = () => {
  localStorage.removeItem('sessions');
};