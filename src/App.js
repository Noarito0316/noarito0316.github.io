import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './App.css';
import AppContent from './pages/Appbody';

function App() {

  return (
    <Router>
    <UserProvider>
      <AppContent />
    </UserProvider>
  </Router>
  )
}

export default App;
