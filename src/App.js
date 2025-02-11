// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Survey from './components/Survey';
import AdminPanel from './components/AdminPanel';
import Results from './components/Results';
import EndScreen from './components/EndScreen';

function ProtectedRoute({ isAdminLoggedIn, children }) {
  if (!isAdminLoggedIn) {
    return (
      <div className="container">
        <p>Accesso non autorizzato. Effettua il login come amministratore.</p>
      </div>
    );
  }
  return children;
}

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route
          path="/admin"
          element={
            <AdminPanel
              isAdminLoggedIn={isAdminLoggedIn}
              onAdminLogin={setIsAdminLoggedIn}
            />
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route path="/end" element={<EndScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
