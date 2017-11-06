import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'

class GameConfig_Chars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRollModal: false,
      showRollReqModal: false,
      modalInput: "",
      charId: "",
      showRollResultModal: false,
      rollResultModalText: "",
      rollResultModalTitle: "",
      rollButton: true
    }
  }
  componentWillReceiveProps(){
    this.initialRollButtonStatus(this.props.game.Characters)
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutVar)
  }

  initialRollButtonStatus = (charArray) => {
    charArray.map((char, index) =>{
      fetch(`${process.env.REACT_APP_API_SERVER}/api/char/submitRollStatus`, {
        method: "POST",
        body: JSON.stringify({charId: char.id}),
        headers: {
          'token': this.props.token,
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(json => {
        if(json.submittedRoll !== '0'){
          this.setState({
            rollButton: false
          })
        }
      })
    })
  }

  requestRoll = (e) => {
    this.charId = parseInt(this.state.charId, 10)
    fetch(`${process.env.REACT_APP_API_SERVER}/api/char/rollStatus`, {
      method: "PATCH",
      body: JSON.stringify({
        charId: this.charId,
        rollStatus: true,
        rollMessage: this.state.modalInput,
      }),
      headers: {
        'token': this.props.token,
        'Content-Type': 'application/json'
      }
    })
    this.setState({showRollReqModal: false})
    this.fetchSubmittedRollStatus()
  }

  fetchSubmittedRollStatus = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/char/submitRollStatus`, {
      method: "POST",
      body: JSON.stringify({charId: this.charId}),
      headers: {
        'token': this.props.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      if(json.submittedRoll !== '0'){
        this.setState({
          rollButton: false
        })
      }
    })
    this.timeoutVar = setTimeout(this.fetchSubmittedRollStatus, 5000);
  }

  fetchRollResult= (e) => {
    clearTimeout(this.timeoutVar)
    this.setState({charId: e.target.value})
    fetch(`${process.env.REACT_APP_API_SERVER}/api/char/submitRollStatus`, {
      method: "POST",
      body: JSON.stringify({charId: e.target.value}),
      headers: {
        'token': this.props.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      this.setState({
          showRollResultModal: true,
          rollResultModalText: json.submittedRoll,
          rollResultModalTitle: json.rollMessage,
          rollButton: true
        })

    })
  }

  closeRollResultModal = (e) => {
    this.charId = parseInt(this.state.charId, 10)
    this.setState({showRollResultModal: false, rollButton: true})
    clearTimeout(this.timeoutVar)
    fetch(`${process.env.REACT_APP_API_SERVER}/api/char/submitRollStatus`, {
      method: "PATCH",
      body: JSON.stringify({
        charId: this.charId,
        rollStatus: '0',
        reqRoll: false
      }),
      headers: {
        'token': this.props.token,
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
  let userChar = <span />
  let charList = (
      this.props.game.Characters.map((c, index)=>{
        return(
          <li key={index}>{c.charName}</li>
        )
      })
    )
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
          <li key={index}>
            <Link to={`/dashboard/game/${this.props.game.id}/${char.id}`}> {char.charName}</Link>
            {this.state.rollButton ? <button onClick={e => this.setState({showRollReqModal: true, charId: e.target.value})} value={char.id}>Roll!</button> :
              <button onClick={this.fetchRollResult} value={char.id}>Result!</button>
           }
          </li>
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
        <div className="container modal-div">
          <Modal animation={false} show={this.state.showRollReqModal} onHide={this.close}>
            <Modal.Body>
              <h1>Request a Roll</h1>
              <p>Message to the player</p>
              <input type="text" onChange={e => this.setState({modalInput: e.target.value})}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.requestRoll}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="container modal-div">
          <Modal animation={false} show={this.state.showRollResultModal} onHide={this.close}>
            <Modal.Body>
              <h1>{this.state.rollResultModalTitle}</h1>
              <p>{this.state.rollResultModalText}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeRollResultModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }

}

export default GameConfig_Chars;
