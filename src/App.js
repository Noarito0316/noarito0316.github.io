import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Projects from './pages/Projects';
import LoginRedirect from './components/LoginGoggle'
import UserInfo from './components/UserInfo';
import LoginButton from './components/LoginButton';

function App() {
  return (
    <Router>
    <Nav/>
    <LoginButton />
    <Routes>
    <Route path="/" element={ <Home/> } />
    <Route path="/projects" element={ <Projects/> } />
    <Route path="/personal" element={ <Personal/> } />
    <Route path="/login" element={<LoginRedirect />} />
    </Routes>
    <UserInfo/>
  </Router>
  )
}

export default App;
