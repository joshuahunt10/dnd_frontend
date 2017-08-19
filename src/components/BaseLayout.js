import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class BaseLayout extends Component {

  render() {
    return (
      <div>
        <h1>This is the Base Layout</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default BaseLayout;
