import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
    <Route path="/" component={ Nav } />
    <Switch>
    <Route exact path="/" component={ Home } />
    <Route exact path="/projects" component={ Projects } />
    <Route exact path="/personal" component={ Personal } />
    </Switch>
  </Router>
  )
}

export default App;
