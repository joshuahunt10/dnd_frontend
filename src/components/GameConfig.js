import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import localStorage from 'local-storage'


class GameConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      game: {
        Characters: []
      },
    }
  }

  componentWillMount(){
    this.setState({
      token: localStorage.get("JWT")
    })
  }

  componentDidMount(){
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
      console.log('the selected game',json);
      this.setState({
        game: json
      })
    })
  }

  render() {
    console.log('gameconfig state',this.state.game);
    return (
      <div>
        <h1>Game Information</h1>
        <h3>{this.state.game.title}</h3>
        <Link to={`/dashboard/charcreate/${this.state.game.id}`}>Create a Character</Link>
        <h4>The characters in this game are:</h4>
        <ul>
          {this.state.game.Characters.map((c, index)=>{
              return(
                <li key={index}>{c.charName}</li>
              )
            })}
        </ul>
      </div>
    );
  }

}

export default GameConfig;
