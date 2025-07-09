import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Projects from './pages/Projects';
import UserInfo from './components/UserInfo';
import Categoria from './pages/Category'
import PostEditor from './components/PostEditor'
import LoginButton from './components/GoogleButton';
import SessionLoader from './pages/Login';  

function App() {

  // 👇 carrega o script apenas uma vez
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

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
    <Route path="/admin" element={ <PostEditor/> } />
    <Route path="/:nome" element={ <Categoria/> } />
    </Routes>
    <UserInfo/>
    </UserProvider>
  </Router>
  )
}

export default App;
