import React, {Component} from 'react';
import localStorage from 'local-storage'
import SpellCasting from './SpellCasting'
import {Redirect} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'


// put pure calculations here that don't need state / props

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
    if (this.state.class.spellcasting) {

    }
    if (this.state.success) {
      return <Redirect to='/dashboard'/>
    }
    return (
      <div className='container charSheet'>
        <div className="rowField">
          <div className='char-field container'>
            <p>Character Name: <strong><span style={{textTransform: 'capitalize', fontSize: '1.5rem'}}>{char.charName}</span></strong></p>
            <p>You are playing a level <strong>{char.level} {char.raceName} {char.className} </strong>
              with the background of <span style={{textTransform: 'capitalize'}}>{char.background}</span>.</p>

            <p>Level: <strong>{char.level}</strong><br />
              <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("level")}>+</button>
              <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("level")}>-</button>
            </p>
            <p>Max HP: <strong>{hp}</strong></p>
            <p>Current HP:
              <input onChange={e => this.setState({currentHP: e.target.value})} value={this.state.currentHP}/></p>
            <p>Size: {char.race.size}</p>
            <p>Speed: {char.race.speed}</p>
          </div>
          <div className="char-field container">
              <h4>Proficiencies:</h4>
              <ul>
                {char.skillProf.map((skill, index) => <li key={index}>{skill}</li>)}
              </ul>
              <h4>Armor and Weapon Profeciencies</h4>
              <ul>
                {this.state.class.proficiencies.map((prof, index) => {
                  return (
                    <div key={index}>
                      <li>{prof.name}</li>
                    </div>
                  )
                })}
              </ul>
              <h4>Profeciencies from your race</h4>
              <ul>
                {this.state.race.traits.map((prof, index) => {
                  return (
                    <div key={index}>
                      <li>{prof.name}</li>
                    </div>
                  )
                })}
              </ul>
          </div>
        </div>
        <div className="rowField">
          <div className="char-field container">
            <fieldset>
              <legend>
                Subclasses and Subraces
              </legend>
              <h4>Subclass:
              </h4>
              {this.state.class.subclasses.map((sc, index) => {
                return(
                  <div key={index}>
                    <p id={sc.url} onClick={this.handleSubClassFetch} style={{cursor: 'pointer'}}>{this.state.subClass}</p>
                  </div>
                )
              })}
              <h4>Subrace:</h4>
              {this.state.race.subraces.map((sr, index) => {
                return(
                  <div key={index}>
                    <p id={sr.url} onClick={this.handleSubRaceFetch} style={{cursor: 'pointer'}}>{this.state.subRace}</p>
                  </div>
                )
              })}

            </fieldset>
          </div>
          <div className='char-field container'>
            <fieldset>
              <legend>Stats</legend>
              <h4 id='savingThrows'>Saving Throws</h4>
              {this.state.class.saving_throws.map((stat, index) => {
                return(
                  <span key={index}><strong> {stat.name} </strong></span>
                )
              })}
              <table className='table table-hover table-responsive'>
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
                    <td>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("str")}>+</button>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("str")}>-</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Dexterity</td>
                    <td>{char.dex}</td>
                    <td>{calcMod(char.dex)}</td>
                    <td>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("dex")}>+</button>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("dex")}>-</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Constitution</td>
                    <td>{char.con}</td>
                    <td>{calcMod(char.con)}</td>
                    <td>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("con")}>+</button>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("con")}>-</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Intelligence</td>
                    <td>{char.int}</td>
                    <td>{calcMod(char.int)}</td>
                    <td>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("int")}>+</button>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("int")}>-</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Wisdom</td>
                    <td>{char.wis}</td>
                    <td>{calcMod(char.wis)}</td>
                    <td>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("wis")}>+</button>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("wis")}>-</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Charisma</td>
                    <td>{char.cha}</td>
                    <td>{calcMod(char.cha)}</td>
                    <td>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("cha")}>+</button>
                      <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("cha")}>-</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </div>
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
