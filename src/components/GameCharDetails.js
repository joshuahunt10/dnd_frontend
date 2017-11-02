import React, {Component} from 'react';
import localStorage from 'local-storage'
import SpellCasting from './SpellCasting'
import {Redirect} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'
import BaseInfo from './DisplayCharacter/BaseInfo'
import AllProf from './DisplayCharacter/AllProf'
import ChosenSubClassAndRace from './DisplayCharacter/ChosenSubClassAndRace'
import Stats from './DisplayCharacter/Stats'
import ReactTimeout from 'react-timeout'


// put pure calculations here that don't need state / props

// let timeoutVar;

function calcMod(num) {
  if (!num) {
    return ""
  } else if (num > 30) {
    return 10
  }
  return Math.floor((num - 10) / 2)
}


function calcHP(hitDie, level, conMod) {
  let hitDieNum = parseInt(hitDie, 10)
  let levelNum = parseInt(level, 10)
  let conModNum = parseInt(conMod, 10)
  let hp = 0;
  hp += hitDieNum + conModNum
  if (levelNum > 1) {
    hp += ((hitDieNum / 2 + 1) + conModNum) * (levelNum - 1)
  }
  return hp
}

class GameCharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.get("JWT"),
      modalText: '',
      modalTitle: '',
      showModal: false,
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
      spellcastingAbility: "",
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
      rollStatus: false,
      race: {
        size: "",
        speed: 0,
        traits: [],
        subraces:[{
          name:"",
          url: ""
        }]
      },
      class: {
        proficiencies : [],
        spellcasting : "",
        saving_throws: [{
          url: ""
        }],
        subclasses: [{
          name: "",
          url: ""
        }]
      }
    }
  }

  componentWillMount() {
    this.fetchOneChar()
  }

  componentDidMount() {
    this.fetchRollStatus()
  }

  componentWillUnmount(){
    this.stopFetchRoll()
  }



  fetchRollStatus = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/char/rollStatus`, {
      method: "POST",
      body: JSON.stringify({charId: this.props.match.params.charId}),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log('checking roll status')
      this.setState({
        rollStatus: json.requestedRoll
      })
    })
    this.timeoutVar = setTimeout(this.fetchRollStatus, 5000);
  }



  stopFetchRoll = () => {
    console.log('SHOW WHEN LEAVING PAGE')
    clearTimeout(this.timeoutVar)

  }

  fetchCharAPI = (classID, raceID) => {
    fetch(`http://www.dnd5eapi.co/api/classes/${classID}`).then(r => r.json()).then(json => {
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
    fetch(`http://www.dnd5eapi.co/api/races/${raceID}`).then(r => r.json()).then(json => {
      this.setState({race: json})
    })
  }

  fetchOneChar = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/user/onechar`, {
      method: "POST",
      body: JSON.stringify({charId: this.props.match.params.charId}),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).then(json => {
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
        this.fetchCharAPI(this.state.classId, this.state.raceId)
      })
    })

  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_SERVER}/api/char/update`, {
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
        nine: this.state.nine
      }),
      headers: {
        'token': this.state.token,
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).then(json => {
      this.setState({success: json.success})
    })
  }

  increaseStat = (stat) => {
    let val = parseInt(this.state[stat], 10)
    this.setState({
      [stat]: val + 1
    })
  }

  decreaseStat= (stat) => {
    let val = parseInt(this.state[stat], 10)
    this.setState({
      [stat]: val - 1
    })
  }

  handleStateUpdate = (stat, value) => {
    this.setState({
      [stat]: value
    })
  }

  handleSubClassFetch = (e) => {
    fetch(`${e.target.id}`)
    .then(r => r.json())
    .then(json => {
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
      this.setState({
        modalText: json.desc,
        modalTitle: json.name,
        showModal: true
      })
    })
  }

  render() {
    let char = this.state
    let hp = calcHP(char.hitDie, char.level, calcMod(char.con))
    if (this.state.success) {
      return <Redirect to='/dashboard'/>
    }
    return (
      <div className='container charSheet'>
        <div className="rowField">
          <BaseInfo
            charName={this.state.charName}
            level = {this.state.level}
            raceName = {this.state.raceName}
            className = {this.state.className}
            background = {this.state.background}
            increaseStat = {this.increaseStat}
            decreaseStat = {this.decreaseStat}
            hp = {hp}
            currentHP = {this.state.currentHP}
            size = {this.state.race.size}
            speed = {this.state.race.speed}
            handleStateUpdate = {this.handleStateUpdate}
          />
          <AllProf
            skillProf = {this.state.skillProf}
            proficiencies = {this.state.class.proficiencies}
            traits = {this.state.race.traits}
          />
        </div>
        <div className="rowField">
          <ChosenSubClassAndRace
            subclasses = {this.state.class.subclasses}
            handleSubClassFetch = {this.handleSubClassFetch}
            subClass = {this.state.subClass}
            subraces = {this.state.race.subraces}
            handleSubRaceFetch = {this.handleSubRaceFetch}
            subRace = {this.state.subRace}
          />

          <Stats
            str = {this.state.str}
            dex = {this.state.dex}
            con = {this.state.con}
            wis = {this.state.wis}
            int = {this.state.int}
            cha = {this.state.cha}
            increaseStat = {this.increaseStat}
            decreaseStat = {this.decreaseStat}
            saving_throws = {this.state.class.saving_throws}
          />
        </div>
        <div className="rowField">
          <div className="char-field container container">
            <fieldset>
              <legend>Bio</legend>
              <p>
              {char.bio}
              </p>
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
          <button className="btn btn-success" type="submit">Finished! Submit Updated Sheet</button>
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

export default GameCharDetails;
