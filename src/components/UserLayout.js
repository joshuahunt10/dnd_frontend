import React, { Component } from 'react';

class UserLayout extends Component {

  render() {
    return (
      <div>
        <h3>Navbar for the User</h3>
        {this.props.children}
      </div>
    );
  }

}

export default UserLayout;
