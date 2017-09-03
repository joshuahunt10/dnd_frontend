import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import localStorage from 'local-storage'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      signout: false,
      token: "",
      charArray: [],
    }
    this.logout = this.logout.bind(this)
  }

  logout(e){
    console.log('button working')
    localStorage.remove("JWT")
    this.setState({signout: true})
  }

  componentWillMount(){
    this.setState({
      token: localStorage.get("JWT")
    })
  }

  componentDidMount(){
    fetch('http://localhost:4000/api/user', {
      method: "GET",
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json);
      this.setState({
        charArray: json.Characters
      })
    })
  }


  render() {
    if(this.state.signout){
      return <Redirect to='/' />
    }
    console.log(this.state);
    return (
      <div>
        <nav>
          <Link to='/dashboard/charcreate'>Create a Character</Link> ||
          <Link to='/dashboard/tables'>Play a game</Link>
        </nav>
        <button onClick={this.logout}>Log Out</button>
        <h2>This is the user Dashboard</h2>
        <h4>Character List</h4>
        <ul>
        {this.state.charArray.map((char) => {
          return <li key={char.id}>{char.charName}</li>
        })}
        </ul>
      </div>
    );
  }

}

export default Dashboard;
