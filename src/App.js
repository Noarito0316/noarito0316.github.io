import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
    <Nav/>
    <Routes>
    <Route path="/" element={ <Home/> } />
    <Route path="/projects" element={ <Projects/> } />
    <Route path="/personal" element={ <Personal/> } />
    </Routes>
  </Router>
  )
}

export default App;
