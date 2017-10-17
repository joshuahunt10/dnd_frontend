import React, { Component } from 'react';

class BaseInfo extends Component {

  render() {
    return (
      <div className='char-field container'>
        <p>Character Name: <strong><span style={{textTransform: 'capitalize', fontSize: '1.5rem'}}>{this.props.charName}</span></strong></p>
        <p>You are playing a level <strong>{this.props.level} {this.props.raceName} {this.props.className} </strong>
          with the background of <span style={{textTransform: 'capitalize'}}>{this.props.background}</span>.</p>

        <p>Level: <strong>{this.props.level}</strong><br />
          <button className="btn btn-secondary intervalButt" onClick={() => this.props.increaseStat("level")}>+</button>
          <button className="btn btn-secondary intervalButt" onClick={() => this.props.decreaseStat("level")}>-</button>
        </p>
        <p>Max HP: <strong>{this.props.hp}</strong></p>
        <p>Current HP:
          <input onChange={e => this.props.handleStateUpdate('currentHP', e.target.value)} value={this.props.currentHP}/></p>
        <p>Size: {this.props.size}</p>
        <p>Speed: {this.props.speed}</p>
      </div>
    );
  }

}

export default BaseInfo;
