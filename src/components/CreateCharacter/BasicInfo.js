import React, { Component } from 'react';

class BasicInfo extends Component {

  handleSpellInput = (e) => {
    this.props.handleStateUpdate('spellList', e.target.value)
  }

  render() {
    return (
      <div className='char-field container'>
        <div className="form-group col-12">
          <label>Character Name:</label>
          <input className="form-control" type="text" onChange={e => this.props.handleStateUpdate('charName', e.target.value)} value={this.props.charName}/>
        </div>
        <div className="form-group col-12">
          <label>Level:</label>
          <input className="form-control" type="text" onChange={e => this.props.handleStateUpdate('level', e.target.value)} value={this.props.level}/>
        </div>
        <div className="form-group col-12">
          <label>Background:</label>
          <input className="form-control" type="text" onChange={e => this.props.handleStateUpdate('background', e.target.value)} value={this.props.background}/>
        </div>
        <div className="form-group col-12">
          <label>Size:</label>
          <input disabled className="form-control" type="text" value={this.props.size}/>
        </div>
        <div className="form-group col-12">
          <label>Speed:</label>
          <input disabled className="form-control" type="text" value={this.props.speed}/>
        </div>
        <div className="form-group col-12">
          <label>Alignment:</label>
          <select className="form-control" onChange={e => this.props.handleStateUpdate('alignment', e.target.value)} >
            <option value=""></option>
            <option value="Lawful Good">Lawful Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawful Neutral">Lawful Neutral</option>
            <option value="Neutral">Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
            <option value="Lawful Evil">Lawful Evil</option>
            <option value="Neutral Evil">Neutral Evil</option>
            <option value="Chaotic Evil">Chaotic Evil</option>
          </select>
        </div>
      </div>
    );
  }

}

export default BasicInfo;
