import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const shortid = require('shortid');
// let socket = this.props.socket;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      roomid: ''
    };
  }

  createRoom = () => {
    const name = '';
    const roomid = shortid.generate();
    // console.log(roomid);
    this.setState({
      roomid: roomid
    });
    this.props.socket.emit('join', { name, roomid }, () => {});

    this.props.socket.on('user connected', () => {
      console.log('Connected');
    });

    // socket.on('update', () => {
    //   console.log('rEACHED');
    //   // this.setState({
    //   //   text: newText.newText
    //   // });
    // });

    this.props.history.push(`/live/${roomid}`);
  };

  enterRoom = event => {
    event.preventDefault();
    const name = this.state.name;
    const roomid = this.state.room;
    this.props.socket.emit('join', { name, roomid }, () => {});

    // socket.on('user connected', () => {
    //   console.log('Connected');
    // });

    this.props.history.push(`/live/${roomid}`);
  };

  render() {
    return (
      <div className='home-outer'>
        <div className='home-wrap'>
          <div className='home-main'>
            <div className='title'>
              <h1>LiveCode</h1>
              <small>Create, Join, Collaborate!</small>
            </div>
            <Link
              // to=
              className='create'
              onClick={() => this.createRoom()}
            >
              <i className='fa fa-plus' aria-hidden='true'></i>
            </Link>
            <Link
              // to='/'
              className='join'
              data-toggle='modal'
              data-target='#exampleModalCenter'
            >
              <i className='fas fa-sign-in-alt'></i>
            </Link>
          </div>
          <div className=''>
            <div
              className='modal fade'
              id='exampleModalCenter'
              tabIndex='-1'
              role='dialog'
              aria-labelledby='exampleModalCenterTitle'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLongTitle'>
                      Enter room code
                    </h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <form action=''>
                    <div className='modal-body'>
                      <input
                        id='name'
                        type='text'
                        value={this.state.name}
                        onChange={event => {
                          this.setState({ name: event.target.value });
                        }}
                      />
                      <input
                        id='room'
                        type='text'
                        value={this.state.room}
                        onChange={event => {
                          this.setState({ room: event.target.value });
                        }}
                      />
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        type='submit'
                        data-dismiss='modal'
                        data-backdrop='false'
                        className='btn btn-primary'
                        onClick={event => {
                          this.enterRoom(event);
                        }}
                      >
                        Join Room
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
