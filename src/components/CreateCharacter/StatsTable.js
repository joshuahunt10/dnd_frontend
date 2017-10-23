import React, { Component } from 'react';

class StatsTable extends Component {

  render() {
    return (
      <div className="char-field container">
        <fieldset>
          <legend>Stats</legend>
          <h4 id="savingThrows">Saving Throws</h4>
          {this.props.savingThrows.map((stat, index) => {
            return(
              <span key={index}><strong> {stat.name}</strong></span>
            )
          })}
          <h4>Base Stats and Mods</h4>
          <table className='table table-hover table-responsive' style={{'textAlign': 'center'}}>
            <thead>
              <tr>
                <th>Stat Name</th>
                <th style={{'textAlign': 'center'}}>Value</th>
                <th style={{'textAlign': 'center'}}>Bonus from Race</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td onClick={this.props.fetchAbilityScoreInfo} id='1' style={{cursor: 'pointer'}}> Strength </td>
                <td><input type='text' onChange={e => this.props.handleStateUpdate('str', e.target.value)} value={this.props.str}/></td>
                <td>{this.props.ability_bonuses[0]}</td>
                <td>{this.props.calcMod(this.props.str)}</td>
              </tr>
              <tr>
                <td onClick={this.props.fetchAbilityScoreInfo} id='2' style={{cursor: 'pointer'}}>Dexterity</td>
                <td><input type='text' onChange={e => this.props.handleStateUpdate('dex', e.target.value)} value={this.props.dex} /></td>
                <td>{this.props.ability_bonuses[1]}</td>
                <td>{this.props.calcMod(this.props.dex)}</td>
              </tr>
              <tr>
                <td onClick={this.props.fetchAbilityScoreInfo} id='3' style={{cursor: 'pointer'}}>Constitution</td>
                <td><input type='text' onChange={this.props.handleConInput} value={this.props.con} /></td>
                <td>{this.props.ability_bonuses[2]}</td>
                <td>{this.props.calcMod(this.props.con)}</td>
              </tr>
              <tr>
                <td onClick={this.props.fetchAbilityScoreInfo} id='4' style={{cursor: 'pointer'}}>Intelligence</td>
                <td><input type='text' onChange={e => this.props.handleStateUpdate('int', e.target.value)} value={this.props.int} /></td>
                <td>{this.props.ability_bonuses[3]}</td>
                <td>{this.props.calcMod(this.props.int)}</td>
              </tr>
              <tr>
                <td onClick={this.props.fetchAbilityScoreInfo} id='5' style={{cursor: 'pointer'}}>Wisdom</td>
                <td><input type='text' onChange={e => this.props.handleStateUpdate('wis', e.target.value)} value={this.props.wis} /></td>
                <td>{this.props.ability_bonuses[4]}</td>
                <td>{this.props.calcMod(this.props.wis)}</td>
              </tr>
              <tr>
                <td onClick={this.props.fetchAbilityScoreInfo} id='6' style={{cursor: 'pointer'}}>Charisma</td>
                <td><input type='text' onChange={e => this.props.handleStateUpdate('cha', e.target.value)} value={this.props.cha} /></td>
                <td>{this.props.ability_bonuses[5]}</td>
                <td>{this.props.calcMod(this.props.cha)}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  }

}

export default StatsTable;
