// import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Live from './components/Live/Live';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/live/:roomid' exact component={Live} />
        <Route path='/' exact component={Home} />
      </Router>
    );
  }
}

export default App;
