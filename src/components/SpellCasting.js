import React, { Component } from 'react';

class SpellCasting extends Component {

  increaseStat = (stat) => {
    let val = parseInt(this.props[stat], 10) + 1
    this.props.handleStateUpdate(stat, val)

  }

  decreaseStat = (stat) => {
    let val = parseInt(this.props[stat], 10) - 1
    this.props.handleStateUpdate(stat, val)
  }

  handleSpellInput = (e) => {
    this.props.handleStateUpdate('spellList', e.target.value)
  }

  render() {
    return (
      <div>
        <fieldset>
          <legend>Spellcasting</legend>
          <p>Your spellist can be found in the PHB (players handbook) starting on page 207</p>
          <p>Your spellcasting modifier is
            <strong> {this.props.spellcastingAbility}</strong>
          </p>
          <p>Your spell save DC is 8 + {this.props.spellcastingAbility} modifier + proficiency bonus</p>
          <p>Your spellcasting attack modifier is your {this.props.spellcastingAbility} modifier + proficiency bonus</p>
          <label>Spells prepared:</label>
          <textarea onChange={this.handleSpellInput} value={this.props.spellList} placeholder="List of spells"></textarea>
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
                <td>{this.props.one}</td>
                <td>
                  <button onClick={() => this.increaseStat("one")}>+</button>
                  <button onClick={() => this.decreaseStat("one")}>-</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.props.two}</td>
                <td>
                  <button onClick={() => this.increaseStat("two")}>+</button>
                  <button onClick={() => this.decreaseStat("two")}>-</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>{this.props.three}</td>
                <td>
                  <button onClick={() => this.increaseStat("three")}>+</button>
                  <button onClick={() => this.decreaseStat("three")}>-</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>{this.props.four}</td>
                <td>
                  <button onClick={() => this.increaseStat("four")}>+</button>
                  <button onClick={() => this.decreaseStat("four")}>-</button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>{this.props.five}</td>
                <td>
                  <button onClick={() => this.increaseStat("five")}>+</button>
                  <button onClick={() => this.decreaseStat("five")}>-</button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>{this.props.six}</td>
                <td>
                  <button onClick={() => this.increaseStat("six")}>+</button>
                  <button onClick={() => this.decreaseStat("six")}>-</button>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>{this.props.seven}</td>
                <td>
                  <button onClick={() => this.increaseStat("seven")}>+</button>
                  <button onClick={() => this.decreaseStat("seven")}>-</button>
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>{this.props.eight}</td>
                <td>
                  <button onClick={() => this.increaseStat("eight")}>+</button>
                  <button onClick={() => this.decreaseStat("eight")}>-</button>
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>{this.props.nine}</td>
                <td>
                  <button onClick={() => this.increaseStat("nine")}>+</button>
                  <button onClick={() => this.decreaseStat("nine")}>-</button>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  }

}

export default SpellCasting;
