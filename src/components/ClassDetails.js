import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import localStorage from "local-storage"
import SpellCasting from './SpellCasting'
import BasicInfo from './CreateCharacter/BasicInfo'
import ClassInfo from './CreateCharacter/ClassInfo'
import ProfChoice from './CreateCharacter/ProfChoice'
import SubClassAndRace from './CreateCharacter/SubClassAndRace'

class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToggle: "",
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
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0,
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
  }

  componentDidMount = () =>{
    this.setState({
      token: localStorage.get("JWT")
    })
    fetch(`http://www.dnd5eapi.co/api/classes/${this.props.match.params.classID}`)
    .then(r => r.json())
    .then(json => {
      this.setState({class: json})
      if(this.state.class.spellcasting){
        fetch(`${this.state.class.spellcasting.url}`)
        .then(r => r.json())
        .then(json => {
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

  fetchAbilityScoreInfo = (e) => {
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

  handleSubClassFetch = (e) =>{
    console.log('handle sub class fetch');
    fetch(`${e.target.id}`)
    .then(r => r.json())
    .then(json => {
      console.log(json);
      this.setState({
        modalText: json.desc[0],
        modalTitle: json.name,
        showModal: true,
        dataToggle: "modal"
      })
    })
  }

  handleSubRaceFetch = (e) => {
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

  calcMod = (num) => {
    if(!num){
      return ""
    } else if (num > 30){
      return 10
    }
    return Math.floor((num-10)/2)
  }

  calcHP = (hitDie, level, conMod) => {
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

  handleProfCheckBox = (e) => {
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
    this.setState({
      skillProf: skillProf
    })
  }

  handleSubClassCheckBox = (e) => {
    this.setState({
      subClass: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_SERVER}/api/user/char/create`, {
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
        one: this.state.one,
        two: this.state.two,
        three: this.state.three,
        four: this.state.four,
        five: this.state.five,
        six: this.state.six,
        seven: this.state.seven,
        eight: this.state.eight,
        nine: this.state.nine,
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

  handleStateUpdate = (stat, value) => {
    this.setState({
      [stat]: value
    })
  }

  handleConInput = (e) => {
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
    console.log(this.state);
    return (
      <div className='container'>
        <h2>Create a Hero: Step 2 of 2</h2>
        <h3>You chose a {this.state.race.name} {this.state.class.name}</h3>
        <div className="rowField">
          <BasicInfo
            handleStateUpdate = {this.handleStateUpdate}
            charName = {this.state.charName}
            level = {this.state.level}
            background = {this.state.background}
            size = {this.state.race.size}
            speed = {this.state.race.speed}
          />

          <ClassInfo
            hitDie = {this.state.class.hit_die}
            level = {this.state.level}
            con = {this.state.con}
            proficiencies = {this.state.class.proficiencies}
            calcMod = {this.calcMod}
            calcHP = {this.calcHP}
            startProf = {this.state.race.starting_proficiencies}
            traits = {this.state.race.traits}
          />
        </div>
        <div className="rowField">
          <ProfChoice
            numChoices = {this.state.class.proficiency_choices[0].choose}
            choices = {this.state.class.proficiency_choices[0].from}
            handleProfCheckBox = {this.handleProfCheckBox}
          />

          <div className="colField">
            <SubClassAndRace
              subclasses = {this.state.class.subclasses}
              handleStateUpdate = {this.handleStateUpdate}
              handleSubClassFetch = {this.handleSubClassFetch}
              subraces = {this.state.race.subraces}
              handleSubRaceFetch = {this.handleSubRaceFetch}
              textBoxDisable  = {this.state.textBoxDisable}
              subRaceDisable = {this.state.subRaceDisable}
              handleSubClassCheckBox = {this.handleSubClassCheckBox}
            />

            <div className="char-field container">
              <fieldset>
                <legend>Stats</legend>
                <h4>Saving Throws</h4>
                {this.state.class.saving_throws.map((stat, index) => {
                  return(
                    <span key={index}> {stat.name}</span>
                  )
                })}
                <h4>Base Stats and Mods</h4>
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
            </div>

          </div>
        </div>
        <div className="rowField">
          <div className="char-field container">
            <fieldset>
              <legend>Bio</legend>
              <textarea rows='15' onChange={e => this.setState({bio: e.target.value})} value={this.state.bio} placeholder="Where did your character come from?"></textarea>
            </fieldset>
          </div>
          <div className="char-field container">
            {this.state.class.spellcasting ? <SpellCasting
              spellcastingAbility={this.state.spellcastingAbility}
              spellList = {this.state.spellList}
              one = {this.state.one}
              two = {this.state.two}
              three = {this.state.three}
              four = {this.state.four}
              five = {this.state.five}
              six = {this.state.six}
              seven = {this.state.seven}
              eight = {this.state.eight}
              nine = {this.state.nine}
              handleStateUpdate = {this.handleStateUpdate}
            /> : <div><fieldset><legend>Spellcasting</legend>This class does not have any spells to cast</fieldset></div>}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Create Character!</button>
        </form>
        <div className="container modal-div">
          <Modal animation={false} show={this.state.showModal} onHide={this.close}>
            <Modal.Body>
              <h1>{this.state.modalTitle}</h1>
              <p>{this.state.modalText}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={e => this.setState({showModal: false})}>Close</Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    );
  }
}

export default ClassDetails;
