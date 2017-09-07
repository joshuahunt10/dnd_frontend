import React, { Component } from 'react';
import localStorage from 'local-storage'

class GameCharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.get("JWT"),
      charObj: {
        str: "",
        dex: "",
        con: "",
        wis: "",
        int: "",
        cha: "",
      }
    }
    this.calcMod = this.calcMod.bind(this)

  }

  componentDidMount(){
    fetch(`http://localhost:4000/api/user/onechar`,{
      method: "POST",
      body: JSON.stringify({
        charId: this.props.match.params.charId
      }),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log('json from character details',json);
      this.setState({
        charObj: json
      })
    })
  }

  calcMod(num){
    if(!num){
      return ""
    } else if (num > 30){
      return 10
    }
    return Math.floor((num-10)/2)
  }

  render() {
    return (
      <div>
        <h4>details on the character</h4>
        <p>Character Name: {this.state.charObj.charName}</p>
        <table>
          <thead>
            <th>Stat</th>
            <th>Value</th>
            <th>Modifier</th>
          </thead>
          <tbody>
            <tr>
              <td>Strength</td>
              <td>{this.state.charObj.str}</td>
              <td>{this.calcMod(this.state.charObj.str)}</td>
            </tr>
            <tr>
              <td>Dexterity</td>
              <td>{this.state.charObj.dex}</td>
              <td>{this.calcMod(this.state.charObj.dex)}</td>
            </tr>
            <tr>
              <td>Constitution</td>
              <td>{this.state.charObj.con}</td>
              <td>{this.calcMod(this.state.charObj.con)}</td>
            </tr>
            <tr>
              <td>Intelligence</td>
              <td>{this.state.charObj.int}</td>
              <td>{this.calcMod(this.state.charObj.int)}</td>
            </tr>
            <tr>
              <td>Wisdom</td>
              <td>{this.state.charObj.wis}</td>
              <td>{this.calcMod(this.state.charObj.wis)}</td>
            </tr>
            <tr>
              <td>Charisma</td>
              <td>{this.state.charObj.cha}</td>
              <td>{this.calcMod(this.state.charObj.cha)}</td>
            </tr>
          </tbody>
        </table>


      </div>
    );
  }

}

export default GameCharDetails;
