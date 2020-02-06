// import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import SocketContext from './components/socket-context';
import Live from './components/Live/Live';
import Home from './components/Home/Home';
import io from 'socket.io-client';

let socket;
const ENDPOINT = 'http://localhost:8000';
socket = io(ENDPOINT);

class App extends Component {
  componentDidMount() {
    socket = io(ENDPOINT);
  }

  render() {
    return (
      <Router>
        <SocketContext.Provider value={socket}>
          <Route
            path='/live/:roomid'
            exact
            component={() => <Live socket={socket} />}
          />
          <Route path='/' exact component={() => <Home socket={socket} />} />
        </SocketContext.Provider>
      </Router>
    );
  }
}

export default App;
