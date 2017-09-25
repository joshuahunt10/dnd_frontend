import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class BaseLayout extends Component {

  render() {
    return (
      <div>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
          <img className="navbar-fire" src="http://i.imgur.com/2a3pDfM.gif"/>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
                <span className="sr-only">(current)</span>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/dashboard'>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/register'>Register</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
              </li>
            </ul>

            <img className="navbar-fire" src="http://i.imgur.com/2a3pDfM.gif"/>

          </div>
        </nav>

        <div className='base-layout-wrapper'>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default BaseLayout;
