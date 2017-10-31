import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class GameConfig_Chars extends Component {
  render() {
  let userChar = <span />
  let charList = ""
  //no characters in the game and not admin
  if(this.props.game.Characters.length === 0 && this.props.game.adminUserId !== this.props.userId){
    userChar = (
      <div>
        <h2>There are not any heroes in this world... yet!</h2>
        <Link to={`/dashboard/charcreate/${this.props.game.id}`}>Create a hero</Link>
      </div>
    )
  }
  //no characters and game admin
  else if(this.props.game.Characters.length === 0 && this.props.game.adminUserId === this.props.userId){
    userChar = (
      <div>
        <h2>No one has joined the game.</h2>
      </div>
    )
  }
  //characters and game admin view
  else if(this.props.game.adminUserId === this.props.userId){
    userChar = <span />
    charList = (
      this.props.game.Characters.map((char, index)=>{
        return(
          <li key={index}> <Link to={`/dashboard/game/${this.props.game.id}/${char.id}`}> {char.charName}</Link><button>Roll!</button></li>
        )
      })
    )
  }
  //characters and normal user
  else(
    this.props.game.Characters.map((char) =>{
      if(char.UserId === this.props.userId){
        userChar = (
          <div className="playerViewChar">
            <h3>Your Hero:
              <Link className='charLink' to={`/dashboard/game/${this.props.game.id}/${char.id}`}> {char.charName}</Link>
            </h3>
          </div>
        )
        return false
      }
      return userChar = (
        <div>
          <h2>You don't have any characters in this game.</h2>
          <Link to={`/dashboard/charcreate/${this.props.game.id}`}>Create a Hero to Join!</Link>
        </div>
      )
    })
  )

    return (
      <div>
        <div className="playerViewCharWrapper">
          {userChar}
        </div>
        <div className="adminViewCharListWrapper">
          <div className="adminViewCharList">
            <h4>The heroes of this world are:</h4>
            <ul>
              {charList}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default GameConfig_Chars;
