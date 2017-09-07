import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import localStorage from 'local-storage'


class GameConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.get("JWT"),
      game: {
        Characters: [],
        adminUserId: ""
      },
      userId: ""
    }
    this.fetchGames = this.fetchGames.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount(){
    this.fetchGames();
    this.fetchUser();
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

  fetchGames(){
    fetch('http://localhost:4000/api/games/details', {
      method: "POST",
      body: JSON.stringify({
        id: this.props.match.params.gameId
      }),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      this.setState({
        game: json
      })
    })
  }


  render() {
    console.log(this.state.game.Characters);
    let userChar = <span />
    console.log(this.state.game.Characters.length);
    if(this.state.game.Characters.length === 0){
      userChar = (
        <div>
          <h2>There are no characters in this game.</h2>
          <Link to={`/dashboard/charcreate/${this.state.game.id}`}>Create a Character</Link>
        </div>
      )
    }
    else(
      this.state.game.Characters.map((char) =>{
        if(char.UserId === this.state.userId){
          userChar = (
            <div className="playerViewChar">
              <h3>Your character in this game: {char.charName}</h3>
            </div>
          )
          return
        }
        return userChar = (
          <div>
            <h2>You don't have any characters in this game</h2>
            <Link to={`/dashboard/charcreate/${this.state.game.id}`}>Create a Character</Link>
          </div>
        )
      })
    )

    let message = <span/>
    if(this.state.game.adminUserId === this.state.userId){
      message = (
        <div className="adminViewCharList">
          <h4>The characters in this game are:</h4>
          <ul>
            {this.state.game.Characters.map((c, index)=>{
              return(
                <li key={index}>{c.charName}</li>
              )
            })}
          </ul>
        </div>
      )
    }

    return (
      <div>
        <h1>Game Information</h1>
        <h3>{this.state.game.title}</h3>
        <div className="adminViewCharListWrapper">
          {message}
        </div>

        <div className="playerViewCharWrapper">
          {userChar}
        </div>
      </div>
    );
  }

}

export default GameConfig;
