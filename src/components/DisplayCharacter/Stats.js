import React, { Component } from 'react';

function calcMod(num) {
  if (!num) {
    return ""
  } else if (num > 30) {
    return 10
  }
  return Math.floor((num - 10) / 2)
}

class Stats extends Component {

  render() {
    return (
      <div className='char-field container'>
        <fieldset>
          <legend>Stats</legend>
          <h4 id='savingThrows'>Saving Throws</h4>
          {this.props.saving_throws.map((stat, index) => {
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
                <td>{this.props.str}</td>
                <td>{calcMod(this.props.str)}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.increaseStat("str")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.decreaseStat("str")}>-</button>
                </td>
              </tr>
              <tr>
                <td>Dexterity</td>
                <td>{this.props.dex}</td>
                <td>{calcMod(this.props.dex)}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.increaseStat("dex")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.decreaseStat("dex")}>-</button>
                </td>
              </tr>
              <tr>
                <td>Constitution</td>
                <td>{this.props.con}</td>
                <td>{calcMod(this.props.con)}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.increaseStat("con")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.decreaseStat("con")}>-</button>
                </td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td>{this.props.int}</td>
                <td>{calcMod(this.props.int)}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.increaseStat("int")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.decreaseStat("int")}>-</button>
                </td>
              </tr>
              <tr>
                <td>Wisdom</td>
                <td>{this.props.wis}</td>
                <td>{calcMod(this.props.wis)}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.increaseStat("wis")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.decreaseStat("wis")}>-</button>
                </td>
              </tr>
              <tr>
                <td>Charisma</td>
                <td>{this.props.cha}</td>
                <td>{calcMod(this.props.cha)}</td>
                <td>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.increaseStat("cha")}>+</button>
                  <button className="btn btn-secondary intervalButt" onClick={() => this.props.decreaseStat("cha")}>-</button>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  }

}

export default Stats;
