import React, { Component } from 'react';
import localStorage from 'local-storage'
// import SpellComp from './SpellComp'
import {Redirect} from 'react-router-dom'

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
      id: "",
      str: "",
      dex: "",
      con: "",
      wis: "",
      int: "",
      cha: "",
      currentHP: 0,
      level: "",
      hitDie: "",
      name: "",
      className: "",
      raceName: "",
      background: "",
      bio: "",
      skillProf: [],
      one: 999,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0,
      spellList: "",
      classId: 0,
      raceId: 0,
      subRace: "",
      subClass: "",
      success: false,
      race: {
        size: "",
        speed: 0,
        starting_proficiencies: [],
      },
      class: {
        proficiencies: [],
        spellcasting: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.increaseStat = this.increaseStat.bind(this)
    this.decreaseStat = this.decreaseStat.bind(this)
    this.fetchOneChar = this.fetchOneChar.bind(this)
    this.fetchCharAPI = this.fetchCharAPI.bind(this)
  }

  componentWillMount(){
    this.fetchOneChar()
  }

  fetchCharAPI(classID, raceID){
    fetch(`http://www.dnd5eapi.co/api/classes/${classID}`)
    .then(r => r.json())
    .then(json => {
      console.log('class json',json);
      this.setState({class: json})
    })
    fetch(`http://www.dnd5eapi.co/api/races/${raceID}`)
    .then(r => r.json())
    .then(json => {
      console.log('race json',json);
      this.setState({race: json})
    })

  }


  fetchOneChar(){
    fetch(`${process.env.REACT_APP_API_SERVER}/api/user/onechar`,{
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
        id: json.id,
        str: json.str,
        dex: json.dex,
        con: json.con,
        wis: json.wis,
        int: json.int,
        cha: json.cha,
        currentHP: json.currentHP,
        level: json.level,
        hitDie: json.hitDie,
        charName: json.charName,
        raceName: json.raceName,
        className: json.className,
        background: json.background,
        bio: json.bio,
        skillProf: json.skillProf,
        one: json.one,
        two: json.two,
        three: json.three,
        four: json.four,
        five: json.five,
        six: json.six,
        seven: json.seven,
        eight: json.eight,
        nine: json.nine,
        spellList: json.spellList,
        classId: json.classId,
        raceId: json.raceId,
        subRace: json.subRace,
        subClass: json.subClass

      }, () => {
        console.log('this.state in callback of setState',this.state);
        this.fetchCharAPI(this.state.classId, this.state.raceId)
      })
    })

  }

  handleSubmit(e){
    e.preventDefault()
    console.log('button working');
    fetch(`${process.env.REACT_APP_API_SERVER}/api/char/update`,{
      method: "PATCH",
      body: JSON.stringify({
        currentHP: this.state.currentHP,
        charId: this.state.id,
        str: this.state.str,
        dex: this.state.dex,
        con: this.state.con,
        int: this.state.int,
        wis: this.state.wis,
        cha: this.state.cha,
        level: this.state.level,
        spellList: this.state.spellList,
        one: this.state.one,
        two: this.state.two,
        three: this.state.three,
        four: this.state.four,
        five: this.state.five,
        six: this.state.six,
        seven: this.state.seven,
        eight: this.state.eight,
        nine: this.state.nine,

      }),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log('the response', json);
      this.setState({
        success: json.success
      })
    })
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
    let spellcastingDiv = <div></div>
    if(this.state.class.spellcasting){
      spellcastingDiv = (
        <fieldset>
          <legend>Spellcasting</legend>
          <p>Your spellist can be found in the PHB (players handbook) starting on page 207</p>
          <p>Your spellcasting modifier is <strong>{this.state.spellcastingAbility}</strong></p>
          <p>Your spell save DC is 8 + {this.state.spellcastingAbility} modifier + proficiency bonus</p>
          <p>Your spellcasting attack modifier is your {this.state.spellcastingAbility} modifier + proficiency bonus</p>
          <label>Spells prepared:</label>
          <textarea onChange={e => this.setState({spellList: e.target.value})} value={this.state.spellList} placeholder="List of spells"></textarea>
          <table>
            <thead>
              <tr>
                <th>Spell Slot Level</th>
                <th>Number of Slots</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{this.state.one}</td>
                <td><button onClick={() => this.increaseStat("one")}>+</button> <button onClick={() => this.decreaseStat("one")}>-</button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.state.two}</td>
                <td><button onClick={() => this.increaseStat("two")}>+</button> <button onClick={() => this.decreaseStat("two")}>-</button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>{this.state.three}</td>
                <td><button onClick={() => this.increaseStat("three")}>+</button> <button onClick={() => this.decreaseStat("three")}>-</button></td>
              </tr>
              <tr>
                <td>4</td>
                <td>{this.state.four}</td>
                <td><button onClick={() => this.increaseStat("four")}>+</button> <button onClick={() => this.decreaseStat("four")}>-</button></td>
              </tr>
              <tr>
                <td>5</td>
                <td>{this.state.five}</td>
                <td><button onClick={() => this.increaseStat("five")}>+</button> <button onClick={() => this.decreaseStat("five")}>-</button></td>
              </tr>
              <tr>
                <td>6</td>
                <td>{this.state.six}</td>
                <td><button onClick={() => this.increaseStat("six")}>+</button> <button onClick={() => this.decreaseStat("six")}>-</button></td>
              </tr>
              <tr>
                <td>7</td>
                <td>{this.state.seven}</td>
                <td><button onClick={() => this.increaseStat("seven")}>+</button> <button onClick={() => this.decreaseStat("seven")}>-</button></td>
              </tr>
              <tr>
                <td>8</td>
                <td>{this.state.eight}</td>
                <td><button onClick={() => this.increaseStat("eight")}>+</button> <button onClick={() => this.decreaseStat("eight")}>-</button></td>
              </tr>
              <tr>
                <td>9</td>
                <td>{this.state.nine}</td>
                <td><button onClick={() => this.increaseStat("nine")}>+</button> <button onClick={() => this.decreaseStat("nine")}>-</button></td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      )
    }
    if(this.state.success){
      return <Redirect to='/dashboard' />
    }
    return (
      <div>
          <h4>details on the character</h4>
          <p>Character Name: {char.charName}</p>
          <p>You are playing a level {char.level} {char.raceName} {char.className} with the background of {char.background}.  Your background story is: <br /> {char.bio}</p>
          <p>Size: {char.race.size}</p>
          <p>Speed: {char.race.speed}</p>
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
          <h4>Proficiencies:</h4>
          <ul>
            {char.skillProf.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
          <h4>Armor and Weapon Profeciencies</h4>
          <ul>
            {this.state.class.proficiencies.map((prof, index) => {
              return(
                <div key={index}>
                  <li>{prof.name}</li>
                </div>
              )
            })}
          </ul>
          <h4>Profeciencies from your race</h4>
          <ul>
            {this.state.race.starting_proficiencies.map((prof, index) =>{
              return(
                <div key={index}><li>{prof.name}</li></div>
              )
            })}
          </ul>
          <fieldset>
            <legend>
              Options for subclasses and subraces
            </legend>
            <h4>Subclass: </h4>
              <p>{this.state.subClass}</p>
            <h4>Subrace:</h4>
            <p>{this.state.subRace}</p>
          </fieldset>

          {spellcastingDiv}

          <form onSubmit={this.handleSubmit}>
        <button type="submit">Finished! Submit Updated Sheet</button>
        </form>


      </div>
    );
  }

}

export default GameCharDetails;
