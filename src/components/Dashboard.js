import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import localStorage from 'local-storage'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      signout: false
    }
    this.logout = this.logout.bind(this)
  }

  logout(e){
    console.log('button working')
    localStorage.remove("JWT")
    this.setState({signout: true})
  }


//Here do I do a componentDidMount and send the token to the api which then decodes it and find the email then searches the DB for that user and uses include for tables and characters and sends that back as a json to display here?

  render() {
    if(this.state.signout){
      return <Redirect to='/' />
    }
    return (
      <div>
        <nav>
          <Link to='/dashboard/charcreate'>Create a Character</Link> ||
          <Link to='/dashboard/tables'>Play a game</Link>
        </nav>
        <button onClick={this.logout}>Log Out</button>
        <h2>This is the user Dashboard</h2>
        {/* <p>{localStorage.get("JWT")}</p> */}
      </div>
    );
  }

}

export default Dashboard;
