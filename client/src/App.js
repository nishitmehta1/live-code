import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Live from './components/Live/Live';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <Route path='/live' exact component={Live} />
      <Route path='/' exact component={Home} />
    </Router>
  );
}

export default App;
