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
      gameArray: []
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
    // fetch('http://localhost:4000/api/user', {
    //   method: "GET",
    //   headers: {
    //     'token': this.state.token,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(r => r.json())
    // .then(json => {
    //   console.log(json);
    //   this.setState({
    //     charArray: json.Characters
    //   })
    // })
    fetch('http://localhost:4000/api/games', {
      method: "GET",
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      this.setState({
        gameArray: json
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
          <Link to='/dashboard/tables'> Create a Game!</Link>
        </nav>
        <button onClick={this.logout}>Log Out</button>
        <div>
          <h2>This is the user Dashboard</h2>
          <h4>Game List</h4>
          <ul>
            {this.state.gameArray.map((game) => {
              return (
                <Link to={`/dashboard/game/${game.id}`}>
                <li key={game.id}>{game.title}</li>
              </Link>
              )
            })}
          </ul>
        </div>

      </div>
    );
  }

}

export default Dashboard;
