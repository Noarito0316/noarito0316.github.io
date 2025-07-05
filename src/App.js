import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Projects from './pages/Projects';
import UserInfo from './components/UserInfo';
import LoginButton from './components/GoogleButton';
import SessionLoader from './pages/Login';  

function App() {
  return (
    <Router>
    <UserProvider>
    <UserInfo/>        
    <Nav/>
    <LoginButton />
    <Routes>
    <Route element={ <SessionLoader/> } />
    <Route path="/" element={ <Home/> } />
    <Route path="/projects" element={ <Projects/> } />
    <Route path="/personal" element={ <Personal/> } />
    </Routes>
    <UserInfo/>
    </UserProvider>
  </Router>
  )
}

export default App;
