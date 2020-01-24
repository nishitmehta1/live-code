import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import io from 'socket.io-client';

let socket;
const ENDPOINT = 'http://localhost:8000';

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      falseRoom: false
    };
  }

  componentDidMount() {
    let room;
    socket = io(ENDPOINT);
    this.setState(
      {
        room: this.props.match.params.roomid
      },
      () => {
        room = this.state.room;
        socket.emit('checkRoom', { room }, () => {});
      }
    );
    socket.on('falseRoom', () => {
      console.log('YESSS');
      this.setState({
        falseRoom: true
      });
    });
  }

  updateText = () => {};

  render() {
    const falseRoom = this.state.falseRoom;
    console.log(falseRoom);
    return (
      <div className='Live-main'>
        {falseRoom ? (
          <h1>Room not present</h1>
        ) : (
          <div className=''>
            <h4>The room id for this room is: {this.state.room}</h4>
            <textarea
              name='env'
              class='env'
              cols='185'
              rows='22'
              autoFocus
              onChange={() => this.updateText()}
            ></textarea>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Live);
