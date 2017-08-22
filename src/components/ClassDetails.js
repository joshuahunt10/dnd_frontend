import React, { Component } from 'react';

class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      str: "",
      dex: "",
      con: "",
      int: "",
      wis: "",
      class: {
        proficiencies: [],
        proficiency_choices: [{
          from: []

        }]

      }
    }
    this.calcMod = this.calcMod.bind(this)
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

  render() {
    // console.log('props in the classDetails',this.props);

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
        <h4>Choose {this.state.class.proficiency_choices[0].choose} proficiencies from the below list:</h4>
        <ul>
          {this.state.class.proficiency_choices[0].from.map((skill, index) => {
            return(
              <div key={index}>
                <li>{skill.name}</li>
              </div>
            )
          })}
        </ul>
        <form>
          <fieldset>
            <legend>Stats</legend>
            <table>
              <tr>
                <th>Stat Name</th>
                <th>Value</th>
                <th>Modifier</th>
                <th>Save</th>
              </tr>
              <tr>
                <td>Strength</td>
                <td><input type='text' onChange={e => this.setState({str: e.target.value})} value={this.state.str}/></td>
                <td>{this.calcMod(this.state.str)}</td>
                <td>Do Later</td>
              </tr>
              <tr>
                <td>Dexterity</td>
                <td><input type='text' onChange={e => this.setState({dex: e.target.value})} value={this.state.dex} /></td>
                <td>{this.calcMod(this.state.dex)}</td>
                <td>Do Later</td>
              </tr>
              <tr>
                <td>Constitution</td>
                <td><input type='text' onChange={e => this.setState({con: e.target.value})} value={this.state.con} /></td>
                <td>{this.calcMod(this.state.con)}</td>
                <td>Do Later</td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td><input type='text' onChange={e => this.setState({int: e.target.value})} value={this.state.int} /></td>
                <td>{this.calcMod(this.state.int)}</td>
                <td>Do Later</td>
              </tr>
              <tr>
                <td>Wisdom</td>
                <td><input type='text' onChange={e => this.setState({wis: e.target.value})} value={this.state.wis} /></td>
                <td>{this.calcMod(this.state.wis)}</td>
                <td>Do Later</td>
              </tr>
            </table>
          </fieldset>
        </form>
      </div>
    );
  }

}

export default ClassDetails;
