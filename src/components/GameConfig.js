import React, { Component } from 'react';
import localStorage from 'local-storage'
import GameConfig_Chars from './GameConfig_Chars'


class GameConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.get("JWT"),
      adminUser: "",
      game: {
        Characters: [],
        description: "",
        adminUserId: ""
      },
      userId: "",
      userName: ""
    }
  }

  componentDidMount(){
    this.fetchGames();
    this.fetchUser();
  }

  fetchUser = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/user`,{
      method: "GET",
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      this.setState({
        userId: json.id,
        userName: json.name
      })
    })
  }

  fetchGames = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/games/details`,{
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
      }, () => {
        this.fetchAdminUser(this.state.game.adminUserId)
      })
    })
  }

  fetchAdminUser = (adminUserId) => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/userdetails`, {
      method: "POST",
      body: JSON.stringify({
        userId: adminUserId
      }),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      this.setState({
        adminUser: json.name
      })
    })
  }
  render() {
    return (
      <div className='container game-config-container'>
        <div className='game-config-head'>
          <h1>{this.state.game.title}</h1>
          <h4>The Master of this World: {this.state.adminUser}</h4>
          <hr />
          <label>About this game:</label> <p>{this.state.game.description}</p>
        </div>
        <div>
          <GameConfig_Chars
            game = {this.state.game}
            userId = {this.state.userId}
            token = {this.state.token}
            fetchGames = {this.fetchGames}
          />
        </div>
      </div>
    );
  }

}

export default GameConfig;
