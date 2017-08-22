import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class BaseLayout extends Component {


  render() {
    return (
      <div>
        <h1>This is the Base Layout</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>

          </ul>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default BaseLayout;
