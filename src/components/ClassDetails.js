import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'


class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      str: "",
      dex: "",
      con: "",
      int: "",
      wis: "",
      modalText: '',
      modalTitle: '',
      showModal: false,
      class: {
        proficiencies: [],
        proficiency_choices: [{
          from: []
        }],
        saving_throws: [{
          url:""
        }]

      }
    }
    this.calcMod = this.calcMod.bind(this)
    this.fetchAbilityScoreInfo = this.fetchAbilityScoreInfo.bind(this)
  }

  componentDidMount(){
    fetch(`http://www.dnd5eapi.co/api/classes/${this.props.match.params.classID}`)
    .then(r => r.json())
    .then(json => {
      console.log(json);
      this.setState({class: json})
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

  render() {


    return (
      <div>
        <h2>This is the class Details page</h2>
        <h3>You chose a {this.state.class.name}</h3>
        <p>Your hit die is a d{this.state.class.hit_die}</p>
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
        {/* <h4>Choose {this.state.class.proficiency_choices[0].choose} proficiencies from the below list:</h4> */}
        {/* need to make logic so that I can check and it will push into an array in the state that holds the choices.  Need to make the uncheck find the index of then splice out. */}
        <fieldset>
          <legend>Choose {this.state.class.proficiency_choices[0].choose} proficiencies from the below list:</legend>
          {this.state.class.proficiency_choices[0].from.map((skill, index) => {
            return(
              <div key={index}>
                <input type='checkbox' />
                <label>{skill.name}</label>
              </div>
            )
          })}
        </fieldset>
        {/* <ul>
          {this.state.class.proficiency_choices[0].from.map((skill, index) => {
            return(
              <div key={index}>
                <li>{skill.name}</li>
              </div>
            )
          })}
        </ul> */}
        <form>
          <fieldset>
            <legend>Stats</legend>
            <table>
              <thead>
                <tr>
                  <th>Stat Name</th>
                  <th>Value</th>
                  <th>Modifier</th>
                  <th>Save</th>
                </tr>
              </thead>
              {this.state.class.saving_throws.map((stat, index) => {
                return(
                  <div key={index}>
                    <a href={stat.url}>test {stat.url.substring(stat.url.lastIndexOf('/') + 1)}</a>
                  </div>
                )
              })}
              <tbody>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='1' style={{cursor: 'pointer'}}> Strength </td>
                  <td><input type='text' onChange={e => this.setState({str: e.target.value})} value={this.state.str}/></td>
                  <td>{this.calcMod(this.state.str)}</td>
                  <td>Do Later</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='2' style={{cursor: 'pointer'}}>Dexterity</td>
                  <td><input type='text' onChange={e => this.setState({dex: e.target.value})} value={this.state.dex} /></td>
                  <td>{this.calcMod(this.state.dex)}</td>
                  <td>Do Later</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='3' style={{cursor: 'pointer'}}>Constitution</td>
                  <td><input type='text' onChange={e => this.setState({con: e.target.value})} value={this.state.con} /></td>
                  <td>{this.calcMod(this.state.con)}</td>
                  <td>Do Later</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='4' style={{cursor: 'pointer'}}>Intelligence</td>
                  <td><input type='text' onChange={e => this.setState({int: e.target.value})} value={this.state.int} /></td>
                  <td>{this.calcMod(this.state.int)}</td>
                  <td>Do Later</td>
                </tr>
                <tr>
                  <td onClick={this.fetchAbilityScoreInfo} id='5' style={{cursor: 'pointer'}}>Wisdom</td>
                  <td><input type='text' onChange={e => this.setState({wis: e.target.value})} value={this.state.wis} /></td>
                  <td>{this.calcMod(this.state.wis)}</td>
                  <td>Do Later</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
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
