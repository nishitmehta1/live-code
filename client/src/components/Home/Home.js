import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className='home-wrap'>
        <div className='home-main'>
          <div className='title'>
            <h1>LiveCode</h1>
            <small>Create, Join, Collaborate!</small>
          </div>
          <Link to='/live'>
            <i class='fa fa-plus' aria-hidden='true'></i>
          </Link>
          <a href='/'>
            <i class='fas fa-sign-in-alt'></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
