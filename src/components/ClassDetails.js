import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import localStorage from "local-storage"

class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      str: undefined,
      dex: undefined,
      con: undefined,
      int: undefined,
      wis: undefined,
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
      createChar: false,
      class: {
        proficiencies: [],
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
  }

  componentDidMount(){
    this.setState({
      token: localStorage.get("JWT")
    })
    fetch(`http://www.dnd5eapi.co/api/classes/${this.props.match.params.classID}`)
    .then(r => r.json())
    .then(json => {
      // console.log('class json',json);
      this.setState({class: json})
    })
    fetch(`http://www.dnd5eapi.co/api/races/${this.props.match.params.raceID}`)
    .then(r => r.json())
    .then(json => {
      // console.log('race json',json);
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
        race: this.props.match.params.raceID,
        class: this.props.match.params.classID,
        str: this.state.str,
        dex: this.state.dex,
        con: this.state.con,
        int: this.state.int,
        wis: this.state.wis,
        subClass: this.state.subClass,
        subRace: this.state.subRace,
        alignment: this.state.alignment,
        background: this.state.background,
        level: this.state.level,
        skillProf: this.state.skillProf,
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

  render() {
    if(this.state.createChar){
      return <Redirect to='/dashboard' />
    }
    console.log('props on classDetails',this.props);
    return (
      <div>
        <h2>This is the class Details page</h2>

        <form onSubmit={this.handleSubmit}>
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
                <input type="radio" value={sc.name} onChange={this.handleSubClassCheckBox}/>
                <label id={sc.url} onClick={this.handleSubClassFetch} style={{cursor: 'pointer'}}>{sc.name}</label>
              </div>
            )
          })}
          <h4>Subraces:</h4>
          {this.state.race.subraces.map((sr, index) => {
            return(
              <div key={index}>
                <input type="radio" value={sr.name} onChange={e => this.setState({subRace: e.target.value})} />
                <label id={sr.url} onClick={this.handleSubRaceFetch} style={{cursor: 'pointer'}}>{sr.name}</label>
              </div>
            )
          })}
        </fieldset>
          <fieldset>
            <legend>Stats</legend>
            <h4>Saving Throws</h4>
            {this.state.class.saving_throws.map((stat, index) => {
              return(
                <span> {stat.name}</span>
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
                  <td><input type='text' onChange={e => this.setState({con: e.target.value})} value={this.state.con} /></td>
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
              </tbody>
            </table>
          </fieldset>
          <fieldset>
            <legend>Bio</legend>
            <textarea onChange={e => this.setState({bio: e.target.value})} value={this.state.bio} placeholder="Where did your character come from?"></textarea>
          </fieldset>
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
