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
    let userChar = <span />
    let charList = (
      this.state.game.Characters.map((c, index)=>{
        return(
          <li key={index}>{c.charName}</li>
        )
      })
    )


    if(this.state.game.Characters.length === 0 && this.state.game.adminUserId !== this.state.userId){
      userChar = (
        <div>
          <h2>There are no characters in this game.</h2>
          <Link to={`/dashboard/charcreate/${this.state.game.id}`}>Create a Character</Link>
        </div>
      )
    } else if(this.state.game.Characters.length === 0 && this.state.game.adminUserId === this.state.userId){
      userChar = (
        <div>
          <h2>No one has joined the game.</h2>
        </div>
      )
    }
    else if(this.state.game.adminUserId === this.state.userId){
      userChar = <span />
      charList = (
        this.state.game.Characters.map((char, index)=>{
          return(
            <li key={index}> <Link to={`/dashboard/game/${this.state.game.id}/${char.id}`}> {char.charName}</Link></li>
          )
        })
      )
    }else(
      this.state.game.Characters.map((char) =>{
        if(char.UserId === this.state.userId){
          userChar = (
            <div className="playerViewChar">
              <h3>Your character in this game:
                <Link to={`/dashboard/game/${this.state.game.id}/${char.id}`}> {char.charName}</Link>
              </h3>
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
    
    return (
      <div>
        <h1>Game Information</h1>
        <h3>{this.state.game.title}</h3>
        <div className="adminViewCharListWrapper">
          <div className="adminViewCharList">
            <h4>The characters in this game are:</h4>
            <ul>
              {charList}
            </ul>
          </div>
        </div>

        <div className="playerViewCharWrapper">
          {userChar}
        </div>
      </div>
    );
  }

}

export default GameConfig;
