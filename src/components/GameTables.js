import React, { Component } from 'react';
import localStorage from 'local-storage'
import {Redirect} from 'react-router-dom'

class GameTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      gameTitle: "",
      gameDesc: "",
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
    fetch(`${process.env.REACT_APP_API_SERVER}/api/games/create`,{
      method: "POST",
      body: JSON.stringify({
        title: this.state.gameTitle,
        description: this.state.gameDesc
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
      <div className='login-wrapper'>
        <form className='create-game-form' onSubmit={this.handleCreateGame}>
          <h3>Create a Game</h3>
          <div>
            <label htmlFor="gameName">Game Name: </label>
            <input type="text" className="form-control" placeholder="Game Name" onChange={e => this.setState({gameTitle: e.target.value})} value={this.state.gameTitle}/>
          </div>
          <div>
            <label htmlFor="gameDesc" >Description:</label>
            <textarea className="form-control" placeholder="About this game" onChange={e => this.setState({gameDesc: e.target.value})} value={this.state.gameDesc} rows="6"/>
            <br />
            <button className="btn btn-success" type="submit">Create a game</button>
          </div>
        </form>
      </div>
    );
  }

}

export default GameTables;
