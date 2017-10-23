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
          <h5>Spells prepared:</h5>
          <textarea onChange={this.handleSpellInput} value={this.props.spellList} placeholder="List of spells" rows='4'></textarea>
          <table className='table table-hover table-responsive'>
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
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("one")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("one")}>-</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.props.two}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("two")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("two")}>-</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>{this.props.three}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("three")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("three")}>-</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>{this.props.four}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("four")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("four")}>-</button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>{this.props.five}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("five")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("five")}>-</button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>{this.props.six}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("six")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("six")}>-</button>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>{this.props.seven}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("seven")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("seven")}>-</button>
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>{this.props.eight}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("eight")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("eight")}>-</button>
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>{this.props.nine}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.increaseStat("nine")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.decreaseStat("nine")}>-</button>
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
