import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import localStorage from "local-storage"

class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBoxDisable: true,
      subRaceDisable: true,
      token: "",
      str: "",
      dex: "",
      con: "",
      int: "",
      wis: "",
      cha: "",
      currentHP: 0,
      modalText: '',
      modalTitle: '',
      showModal: false,
      skillProf: [],
      subClass: "",
      subRace: "",
      alignment: "",
      background: "",
      level: 1,
      charName: undefined,
      bio: "",
      spellcastingAbility: "",
      spellSlots: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        seven: 0,
        eight: 0,
        nine: 0
      },
      spellList: "",
      createChar: false,
      class: {
        proficiencies: [],
        name: "",
        proficiency_choices: [{
          from: []
        }],
        saving_throws: [{
          url:""
        }],
        subclasses: [{
          name: "",
          url: ""
        }]
      },
      race:{
        name:"",
        ability_bonuses: [],
        traits: [{
          name: "",
          url: ""
        }],
        subraces:[{
          name:"",
          url: ""
        }],
        starting_proficiencies: [{
          name: "",
          url: ""
        }],
        size: "",
        speed: "",

      },
    }
    this.calcMod = this.calcMod.bind(this)
    this.fetchAbilityScoreInfo = this.fetchAbilityScoreInfo.bind(this)
    this.handleProfCheckBox = this.handleProfCheckBox.bind(this)
    this.handleSubClassFetch = this.handleSubClassFetch.bind(this)
    this.handleSubClassCheckBox = this.handleSubClassCheckBox.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubRaceFetch = this.handleSubRaceFetch.bind(this)
    this.calcHP = this.calcHP.bind(this)
    this.increaseStat = this.increaseStat.bind(this)
    this.decreaseStat = this.decreaseStat.bind(this)
    this.handleConInput = this.handleConInput.bind(this)
  }

  componentDidMount(){
    this.setState({
      token: localStorage.get("JWT")
    })
    fetch(`http://www.dnd5eapi.co/api/classes/${this.props.match.params.classID}`)
    .then(r => r.json())
    .then(json => {
      console.log('class json',json);
      this.setState({class: json})
      if(this.state.class.spellcasting){
        console.log('spallcasting here');
        fetch(`${this.state.class.spellcasting.url}`)
        .then(r => r.json())
        .then(json => {
          console.log('spellcasting',json);
          this.setState({
            spellcastingAbility: json.spellcasting_ability.name
          })
        })
      }

    })
    fetch(`http://www.dnd5eapi.co/api/races/${this.props.match.params.raceID}`)
    .then(r => r.json())
    .then(json => {
      console.log('race json',json);
      this.setState({race: json})
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

  calcHP(hitDie, level, conMod){
    if(typeof conMod === 'string'){
      return <i><strong>Enter Constitution to calculate HP</strong></i>
    }
      let hp = 0;

      hp += hitDie + conMod
      if(level > 1){
        hp += ((hitDie/2 + 1) + conMod) * (level - 1)
      }

      return hp
  }

  fetchAbilityScoreInfo(e){
    fetch(`http://www.dnd5eapi.co/api/ability-scores/${e.target.id}`)
    .then(r => r.json())
    .then(json => {
      this.setState({
        modalText: json.desc[0],
        modalTitle: json.full_name,
        showModal: true
      })
    })
  }

  handleSubClassFetch(e){
    fetch(`${e.target.id}`)
    .then(r => r.json())
    .then(json => {
      console.log(json);
      this.setState({
        modalText: json.desc[0],
        modalTitle: json.name,
        showModal: true
      })
    })
  }

  handleSubRaceFetch(e){
    fetch(`${e.target.id}`)
    .then(r => r.json())
    .then(json => {
      console.log(json);
      this.setState({
        modalText: json.desc,
        modalTitle: json.name,
        showModal: true
      })
    })
  }

  handleProfCheckBox(e){
    let skillProf = this.state.skillProf
    let splice = false
    let holderIndex = 0;

    for (var i = 0; i < skillProf.length; i++) {
      if(skillProf[i] === e.target.value){
        splice = true
        holderIndex = i
      }
    }

    if(splice){
      skillProf.splice(holderIndex, 1)
    }
    else{
      skillProf.push(e.target.value)
    }
    console.log('this.state.skillProf',skillProf);
    this.setState({
      skillProf: skillProf
    })
  }

  handleSubClassCheckBox(e){
    this.setState({
      subClass: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    fetch('http://localhost:4000/api/user/char/create', {
      method: "POST",
      body: JSON.stringify({
        charName: this.state.charName,
        raceId: this.props.match.params.raceID,
        classId: this.props.match.params.classID,
        raceName: this.state.race.name,
        className: this.state.class.name,
        str: this.state.str,
        dex: this.state.dex,
        con: this.state.con,
        int: this.state.int,
        wis: this.state.wis,
        cha: this.state.cha,
        currentHP: this.state.currentHP,
        subClass: this.state.subClass,
        subRace: this.state.subRace,
        alignment: this.state.alignment,
        background: this.state.background,
        level: this.state.level,
        bio: this.state.bio,
        skillProf: this.state.skillProf,
        hitDie: this.state.class.hit_die,
        one: this.state.spellSlots.one,
        two: this.state.spellSlots.two,
        three: this.state.spellSlots.three,
        four: this.state.spellSlots.four,
        five: this.state.spellSlots.five,
        six: this.state.spellSlots.six,
        seven: this.state.spellSlots.seven,
        eight: this.state.spellSlots.eight,
        nine: this.state.spellSlots.nine,
        spellList: this.state.spellList,
        GameId: this.props.match.params.gameId
      }),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log('the response', json)
      if(json.success){
        this.setState({
          createChar: true
        })
      }
    })
  }

  increaseStat(stat){
    let val = this.state.spellSlots[stat]
    this.setState({
      spellSlots:{
        ...this.state.spellSlots,
        [stat]: val + 1
      }
    })
  }

  decreaseStat(stat){
    let val = this.state.spellSlots[stat]
    this.setState({
      spellSlots:{
        ...this.state.spellSlots,
        [stat]: val - 1
      }
    })
  }

  handleConInput(e){
    let currentHP = this.calcHP(this.state.class.hit_die, this.state.level, this.calcMod(e.target.value))
    this.setState({
      con: e.target.value,
      currentHP: currentHP
    })

  }

  render() {
    if(this.state.createChar){
      return <Redirect to='/dashboard' />
    }
    let spellcastingDiv = <div></div>
    if(this.state.spellcastingAbility){
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
                <td>{this.state.spellSlots.one}</td>
                <td><button onClick={() => this.increaseStat("one")}>+</button> <button onClick={() => this.decreaseStat("one")}>-</button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.state.spellSlots.two}</td>
                <td><button onClick={() => this.increaseStat("two")}>+</button> <button onClick={() => this.decreaseStat("two")}>-</button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>{this.state.spellSlots.three}</td>
                <td><button onClick={() => this.increaseStat("three")}>+</button> <button onClick={() => this.decreaseStat("three")}>-</button></td>
              </tr>
              <tr>
                <td>4</td>
                <td>{this.state.spellSlots.four}</td>
                <td><button onClick={() => this.increaseStat("four")}>+</button> <button onClick={() => this.decreaseStat("four")}>-</button></td>
              </tr>
              <tr>
                <td>5</td>
                <td>{this.state.spellSlots.five}</td>
                <td><button onClick={() => this.increaseStat("five")}>+</button> <button onClick={() => this.decreaseStat("five")}>-</button></td>
              </tr>
              <tr>
                <td>6</td>
                <td>{this.state.spellSlots.six}</td>
                <td><button onClick={() => this.increaseStat("six")}>+</button> <button onClick={() => this.decreaseStat("six")}>-</button></td>
              </tr>
              <tr>
                <td>7</td>
                <td>{this.state.spellSlots.seven}</td>
                <td><button onClick={() => this.increaseStat("seven")}>+</button> <button onClick={() => this.decreaseStat("seven")}>-</button></td>
              </tr>
              <tr>
                <td>8</td>
                <td>{this.state.spellSlots.eight}</td>
                <td><button onClick={() => this.increaseStat("eight")}>+</button> <button onClick={() => this.decreaseStat("eight")}>-</button></td>
              </tr>
              <tr>
                <td>9</td>
                <td>{this.state.spellSlots.nine}</td>
                <td><button onClick={() => this.increaseStat("nine")}>+</button> <button onClick={() => this.decreaseStat("nine")}>-</button></td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      )
    }
    return (
      <div>
        <h2>Create a Hero: Step 2 of 2</h2>
        <h3>You chose a {this.state.race.name} {this.state.class.name}</h3>
        <label>Character Name:</label>
        <input type="text" onChange={e => this.setState({charName: e.target.value})} value={this.state.charName}/>

        <label>Level:</label>
        <input type="text" onChange={e => this.setState({level: e.target.value})} value={this.state.level}/>

        <label>Background:</label>
        <input type="text" onChange={e => this.setState({background: e.target.value})} value={this.state.background}/>
        <label>Size:</label>
        <input type="text" value={this.state.race.size}/>
        <label>Speed:</label>
        <input type="text" value={this.state.race.speed}/>
        <label>Alignment:</label>
        <select onChange={e => this.setState({alignment: e.target.value})} >
          <option value=""></option>
          <option value="Lawful Good">Lawful Good</option>
          <option value="Neutral Good">Neutral Good</option>
          <option value="Chaotic Good">Chaotic Good</option>
          <option value="Lawful Neutral">Lawful Neutral</option>
          <option value="Neutral">Neutral</option>
          <option value="Chaotic Neutral">Chaotic Neutral</option>
          <option value="Lawful Evil">Lawful Evil</option>
          <option value="Neutral Evil">Neutral Evil</option>
          <option value="Chaotic Evil">Chaotic Evil</option>
        </select>
        <p>Your hit die is a d{this.state.class.hit_die}</p>
        <p>Your max hp is {this.calcHP(this.state.class.hit_die, this.state.level, this.calcMod(this.state.con))}</p>
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
        <h4>Additional traits from your race</h4>
        <ul>
          {this.state.race.traits.map((traits, index) => {
            return(
              <div key={index}>
                <li id={traits.url} onClick={this.handleSubClassFetch} style={{cursor: 'pointer'}}>{traits.name}
                </li>
              </div>
            )
          })}
        </ul>

        <fieldset>
          <legend>Choose {this.state.class.proficiency_choices[0].choose} proficiencies from the below list:</legend>
          {this.state.class.proficiency_choices[0].from.map((skill, index) => {
            return(
              <div key={index}>
                <input type='checkbox' onChange={this.handleProfCheckBox} value={skill.name}/>
                <label>{skill.name}</label>
              </div>
            )
          })}
        </fieldset>
        <fieldset>
          <legend>
            Options for subclasses and subraces
          </legend>
          <h4>Subclasses: </h4>
          {this.state.class.subclasses.map((sc, index) => {
            return(
              <div key={index} >
                <input type="radio" value={sc.name} name='subclass' onChange={this.handleSubClassCheckBox}
                />
                <span id={sc.url} onClick={this.handleSubClassFetch} style={{cursor: 'pointer'}}>{sc.name}</span><br />

                <input type='radio' value='other' name='subclass' id='radio-other'
                  onChange={e => this.setState({textBoxDisable: false})}
                />
                <span>Other: <input id='other-input' type='text' disabled={this.state.textBoxDisable}
                  onChange={e => this.setState({subClass: e.target.value})}
                 /></span>
              </div>
            )
          })}
          <h4>Subraces:</h4>
          {this.state.race.subraces.map((sr, index) => {
            return(
              <div key={index}>
                <input type="radio"  name='subRace' value={sr.name} onChange={e => this.setState({subRace: e.target.value})} />
                <label id={sr.url} onClick={this.handleSubRaceFetch} style={{cursor: 'pointer'}}>{sr.name}</label>
              <br />
              <input type='radio' value='other' name='subRace' id='radio-other'
                onChange={e => this.setState({subRaceDisable: false})} />
              <span>Other: <input id='other-input' type='text' disabled={this.state.subRaceDisable}
                onChange={e => this.setState({subRace: e.target.value})}/></span>
              </div>
            )
          })}
        </fieldset>
          <fieldset>
            <legend>Stats</legend>
            <h4>Saving Throws</h4>
            {this.state.class.saving_throws.map((stat, index) => {
              return(
                <span key={index}> {stat.name}</span>
              )
            })}
            <table>
              <thead>
                <tr>
                  <th>Stat Name</th>
                  <th>Value</th>
                  <th>Bonus from Race</th>
                  <th>Modifier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='1' style={{cursor: 'pointer'}}> Strength </td>
                  <td><input type='text' onChange={e => this.setState({str: e.target.value})} value={this.state.str}/></td>
                  <td>{this.state.race.ability_bonuses[0]}</td>
                  <td>{this.calcMod(this.state.str)}</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='2' style={{cursor: 'pointer'}}>Dexterity</td>
                  <td><input type='text' onChange={e => this.setState({dex: e.target.value})} value={this.state.dex} /></td>
                  <td>{this.state.race.ability_bonuses[1]}</td>
                  <td>{this.calcMod(this.state.dex)}</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='3' style={{cursor: 'pointer'}}>Constitution</td>
                  <td><input type='text' onChange={this.handleConInput} value={this.state.con} /></td>
                  <td>{this.state.race.ability_bonuses[2]}</td>
                  <td>{this.calcMod(this.state.con)}</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='4' style={{cursor: 'pointer'}}>Intelligence</td>
                  <td><input type='text' onChange={e => this.setState({int: e.target.value})} value={this.state.int} /></td>
                  <td>{this.state.race.ability_bonuses[3]}</td>
                  <td>{this.calcMod(this.state.int)}</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='5' style={{cursor: 'pointer'}}>Wisdom</td>
                  <td><input type='text' onChange={e => this.setState({wis: e.target.value})} value={this.state.wis} /></td>
                  <td>{this.state.race.ability_bonuses[4]}</td>
                  <td>{this.calcMod(this.state.wis)}</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='5' style={{cursor: 'pointer'}}>Charisma</td>
                  <td><input type='text' onChange={e => this.setState({cha: e.target.value})} value={this.state.cha} /></td>
                  <td>{this.state.race.ability_bonuses[5]}</td>
                  <td>{this.calcMod(this.state.cha)}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <fieldset>
            <legend>Bio</legend>
            <textarea onChange={e => this.setState({bio: e.target.value})} value={this.state.bio} placeholder="Where did your character come from?"></textarea>
          </fieldset>
          {spellcastingDiv}
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Create Character!</button>
        </form>
         <Modal show={this.state.showModal} onHide={this.close}>
           <Modal.Body>
             <h1>{this.state.modalTitle}</h1>
             <p>{this.state.modalText}</p>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={e => this.setState({showModal: false})}>Close</Button>
           </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ClassDetails;
