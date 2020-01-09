import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Live extends Component {
  render() {
    return (
      <div className='Live-main'>
        <textarea
          name='env'
          class='env'
          cols='185'
          rows='22'
          autoFocus
        ></textarea>
      </div>
    );
  }
}

export default Live;
