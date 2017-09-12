import React, { Component } from 'react';
import localStorage from 'local-storage'

// put pure calculations here that don't need state / props

function calcMod(num){
  if(!num){
    return ""
  } else if (num > 30){
    return 10
  }
  return Math.floor((num-10)/2)
}

function calcHP(hitDie, level, conMod){
  let hitDieNum = parseInt(hitDie, 10)
  let levelNum = parseInt(level, 10)
  let conModNum = parseInt(conMod, 10)
    let hp = 0;
    hp += hitDieNum + conModNum
    if(levelNum > 1){
      hp += ((hitDieNum/2 + 1) + conModNum) * (levelNum - 1)
    }
    return hp
}

class GameCharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.get("JWT"),
      str: "",
      dex: "",
      con: "",
      wis: "",
      int: "",
      cha: "",
      currentHP: "",
      level: "",
      hitDie: "",
      name: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.increaseStat = this.increaseStat.bind(this)
    this.decreaseStat = this.decreaseStat.bind(this)
    this.fetchOneChar = this.fetchOneChar.bind(this)
  }

  componentDidMount(){
    this.fetchOneChar()
  }

  fetchOneChar(){
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
        str: json.str,
        dex: json.dex,
        con: json.con,
        wis: json.wis,
        int: json.int,
        cha: json.cha,
        currentHP: json.currentHP,
        level: json.level,
        hitDie: json.hitDie,
        charName: json.charName
      })
    })
  }

  //Create a submit function that will patch to /api/char/update and submits all the stats along with current HP and level.
  handleSubmit(e){
    e.preventDefault()
    console.log('button working');
  }


  increaseLevel(e){
    let lvl = parseInt(this.state.level, 10)
    this.setState({
      level: lvl + 1
    })
  }

  decreaseLevel(e){
    let lvl = parseInt(this.state.level, 10)
    this.setState({
      level: lvl - 1
    })
  }

  increaseStat(stat){
    let val = parseInt(this.state[stat], 10)
    this.setState({
      [stat]: val + 1
    })
  }

  decreaseStat(stat){
    let val = parseInt(this.state[stat], 10)
    this.setState({
      [stat]: val - 1
    })
  }

  render() {
    let char = this.state
    let hp = calcHP(char.hitDie, char.level, calcMod(char.con))
    return (
      <div>

          <h4>details on the character</h4>
          <p>Character Name: {char.charName}</p>
          <p>You are playing a </p>
          <p>Level: {char.level} <button onClick={() => this.increaseStat("level")}>+</button> <button onClick={() => this.decreaseStat("level")}>-</button></p>
          <p>Max HP: {hp}</p>
          <p>Current HP: <input onChange={e => this.setState({currentHP: e.target.value})} value={this.state.currentHP}/></p>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
                <th>Modifier</th>
                <th>Update Stat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Strength</td>
                <td>{char.str}</td>
                <td>{calcMod(char.str)}</td>
                <td><button onClick={() => this.increaseStat("str")}>+</button> <button onClick={() => this.decreaseStat("str")}>-</button></td>
              </tr>
              <tr>
                <td>Dexterity</td>
                <td>{char.dex}</td>
                <td>{calcMod(char.dex)}</td>
                <td><button onClick={() => this.increaseStat("dex")}>+</button> <button onClick={() => this.decreaseStat("dex")}>-</button></td>
              </tr>
              <tr>
                <td>Constitution</td>
                <td>{char.con}</td>
                <td>{calcMod(char.con)}</td>
                <td><button onClick={() => this.increaseStat("con")}>+</button> <button onClick={() => this.decreaseStat("con")}>-</button></td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td>{char.int}</td>
                <td>{calcMod(char.int)}</td>
                <td><button onClick={() => this.increaseStat("int")}>+</button> <button onClick={() => this.decreaseStat("int")}>-</button></td>
              </tr>
              <tr>
                <td>Wisdom</td>
                <td>{char.wis}</td>
                <td>{calcMod(char.wis)}</td>
                <td><button onClick={() => this.increaseStat("wis")}>+</button> <button onClick={() => this.decreaseStat("wis")}>-</button></td>
              </tr>
              <tr>
                <td>Charisma</td>
                <td>{char.cha}</td>
                <td>{calcMod(char.cha)}</td>
                <td><button onClick={() => this.increaseStat("cha")}>+</button> <button onClick={() => this.decreaseStat("cha")}>-</button></td>
              </tr>
            </tbody>
          </table>
          <form onSubmit={this.handleSubmit}>
        <button type="submit">Update Character Sheet</button>
        </form>


      </div>
    );
  }

}

export default GameCharDetails;
