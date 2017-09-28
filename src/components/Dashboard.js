import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import localStorage from 'local-storage'
import gmIcon from "../styles/images/gm-icon.png"

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
    fetch(`${process.env.REACT_APP_API_SERVER}/api/games`, {
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
    fetch(`${process.env.REACT_APP_API_SERVER}/api/user`, {
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
    let gameHTML = "";

    return (
      <div id="dashboard">
        <nav className='dash-nav'>
          <Link to='/dashboard/tables'>
          <button type="button" className="btn btn-success">Create a Game!</button>
           </Link>
          <button className="btn btn-secondary" onClick={this.logout}>Log Out</button>
        </nav>
        <div className="dash-head-wrapper">
          <h3 className="dash-head">Games on Tabletop Storehouse: </h3>
          <div className='game-legend'>
            <ul className="game-legend-list">
              <li>
                <img className='legend-logo' src="http://www.enworld.org/forum/attachment.php?s=d02d85744644ba734eec5e6c5b07bd22&attachmentid=62059&d=1402069840&stc=1" alt=''/>
                <span>The game has no players</span>
              </li>
              <li>
                <img className='legend-logo' src="http://www.watchtowerrestaurant.com/wp-content/uploads/2016/11/cropped-Dice-d20-Opaque2_black.png" alt=''/>
                <span>You have a character in the game</span>
              </li>
              <li>
                <img className = 'legend-logo'
                  src={gmIcon}
                    alt='' />
                    <span>You are the GM of the game</span>
              </li>
            </ul>
          </div>
        </div>
        <div className = "game-wrapper">

            {this.state.gameArray.map((game) => {
              let statusStyling = ""
              let numPlayers = game.Characters.length
              if (game.adminUserId === this.state.userId){
                statusStyling = "adminStyling"
                gameHTML = (
                  <img className = 'dnd-logo'
                    src={gmIcon}
                      alt='' />
                )
              }
              else {
                statusStyling = 'noPlayerStyling'
                gameHTML = (
                  <img className='dnd-logo' src="http://www.enworld.org/forum/attachment.php?s=d02d85744644ba734eec5e6c5b07bd22&attachmentid=62059&d=1402069840&stc=1" alt=''/>
                )
              }
              game.Characters.map((char) => {
                if(char.UserId === this.state.userId){
                  statusStyling = 'playerStyling'
                  gameHTML = (
                    <img className='dnd-logo' src="http://www.watchtowerrestaurant.com/wp-content/uploads/2016/11/cropped-Dice-d20-Opaque2_black.png" alt=''/>
                  )

                }
              })

              return (

                <div className="gameName-container" key={game.id}>
                    <Link id="linkToGame" to={`/dashboard/game/${game.id}`}>
                    {game.title} - {numPlayers} player(s)
                    {gameHTML}
                    </Link>
                </div>

              )
            })}

        </div>

      </div>
    );
  }

}

export default Dashboard;
