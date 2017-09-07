import React, { Component } from 'react';
import localStorage from 'local-storage'
import {Redirect} from 'react-router-dom'

class GameTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      gameTitle: "",
      gameCreated: false

    }
    this.handleCreateGame = this.handleCreateGame.bind(this)
  }

  componentDidMount(){
    this.setState({
      token: localStorage.get("JWT")
    })
  }

  handleCreateGame(e){
    e.preventDefault()
    fetch('http://localhost:4000/api/games/create', {
      method: "POST",
      body: JSON.stringify({
        title: this.state.gameTitle
      }),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json);
      this.setState({
        gameCreated: json.gameCreated
      })
    })
  }

  render() {
    if(this.state.gameCreated){
      return <Redirect to='/dashboard' />
    }
    return (
      <div>
        <h2>This page will display the game tables.</h2>
        <div>
          <h4>Tables!</h4>
          <form onSubmit={this.handleCreateGame}>
            <input type="text" placeholder="Game Name" onChange={e => this.setState({gameTitle: e.target.value})} value={this.state.gameTitle}/>
            <button type="submit">Create a game</button>
          </form>

        </div>
      </div>
    );
  }

}

export default GameTables;
