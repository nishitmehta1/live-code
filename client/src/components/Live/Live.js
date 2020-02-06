import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

let socket;
const ENDPOINT = 'http://localhost:8000';

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      falseRoom: false,
      text: ''
    };
  }

  componentDidMount() {
    let room;
    socket = this.props.socket;

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
      this.setState(
        {
          falseRoom: true
        },
        () => {
          this.props.history.push('/');
        }
      );
    });

    socket.on('update', ({ newText }, callback) => {
      console.log('rEACHED', newText);
      this.setState({
        text: newText
      });
    });
  }

  updateText = event => {
    event.preventDefault();
    const newText = event.target.value;
    const room = this.state.room;
    this.setState(
      {
        text: newText
      },
      () => {
        socket.emit('updateText', { newText, room }, () => {});
      }
    );
    // socket.on('update', newText => {
    //   console.log('rEACHED', newText);
    //   this.setState({
    //     text: newText.newText
    //   });
    // });
  };

  render() {
    const falseRoom = this.state.falseRoom;
    return (
      <div className='Live-main'>
        {falseRoom ? (
          <h1>Room not present</h1>
        ) : (
          <div className=''>
            <h4>The room id for this room is: {this.state.room}</h4>
            <textarea
              name='env'
              className='env'
              cols='185'
              rows='22'
              autoFocus
              value={this.state.text}
              onChange={event => this.updateText(event)}
            ></textarea>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Live);
