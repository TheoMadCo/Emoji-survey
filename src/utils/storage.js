const DEFAULT_QUESTIONS = [
  { id: 1, text: 'Ti è piaciuto il gioco del calcolo a mente?', negativeLabel: 'No per niente', positiveLabel: 'Si tanto' },
  { id: 2, text: 'Era difficile il gioco del calcolo a mente?', negativeLabel: 'Difficilissimo', positiveLabel: 'Facilissimo' },
  { id: 3, text: 'Ti è piaciuto il gioco del calcolo in colonna?', negativeLabel: 'No per niente', positiveLabel: 'Si tanto' },
  { id: 4, text: 'Era difficile il gioco del calcolo in colonna?', negativeLabel: 'Difficilissimo', positiveLabel: 'Facilissimo' },
  { id: 5, text: 'Ti è piaciuto il gioco dei blocchi numerati?', negativeLabel: 'No per niente', positiveLabel: 'Si tanto' },
  { id: 6, text: 'Era difficile il gioco dei blocchi numerati?', negativeLabel: 'Difficilissimo', positiveLabel: 'Facilissimo' },
  { id: 7, text: 'Ti piacerebbe usare questi giochi per fare matematica?', negativeLabel: 'No per niente', positiveLabel: 'Si tanto' },
  { id: 8, text: 'I giochi erano divertenti?', negativeLabel: 'No per niente', positiveLabel: 'Si tanto' },
  { id: 9, text: 'Ti gira la testa?', negativeLabel: 'No per niente', positiveLabel: 'Si tanto' },
];

export const loadQuestions = () => {
  const stored = localStorage.getItem('questions');
  if (stored) {
    const questions = JSON.parse(stored);
    // Check if any question is missing labels and update them
    const updatedQuestions = questions.map(q => {
      const defaultQuestion = DEFAULT_QUESTIONS.find(dq => dq.id === q.id);
      return {
        ...q,
        negativeLabel: q.negativeLabel || defaultQuestion.negativeLabel,
        positiveLabel: q.positiveLabel || defaultQuestion.positiveLabel
      };
    });
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    return updatedQuestions;
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