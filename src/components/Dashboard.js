import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import localStorage from 'local-storage'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      signout: false,
      token: localStorage.get("JWT"),
      charArray: [],
      gameArray: [],
      userId: ""
    }
    this.logout = this.logout.bind(this)
    this.fetchAllGames = this.fetchAllGames.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  logout(e){
    console.log('button working')
    localStorage.remove("JWT")
    this.setState({signout: true})
  }

  componentDidMount(){
    this.fetchAllGames();
    this.fetchUser();

  }
  fetchAllGames(){
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

  fetchUser(){
    fetch('http://localhost:4000/api/user', {
      method: "GET",
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      this.setState({
        userId: json.id
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
              let thisClass = ""
              if (game.adminUserId === this.state.userId){
                thisClass = "adminStyling"
              }
              return (

                <li key={game.id}>
                  <Link className={thisClass} to={`/dashboard/game/${game.id}`}>
                  {game.title}
                  </Link>
                </li>

              )
            })}
          </ul>
        </div>

      </div>
    );
  }

}

export default Dashboard;
