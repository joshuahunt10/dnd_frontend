import React, { Component } from 'react';

class ClassInfo extends Component {



  render() {
    return (
      <div className="char-field container">
        <p>Your hit die is a d{this.props.hitDie}</p>
        <p>Your max hp is {this.props.calcHP(this.props.hitDie, this.props.level, this.props.calcMod(this.props.con))}</p>
        <h4>Armor and Weapon Profeciencies</h4>
        <ul>
          {this.props.proficiencies.map((prof, index) => {
            return(
              <div key={index}>
                <li>{prof.name}</li>
              </div>
            )
          })}
        </ul>
        <h4>Profeciencies from your race</h4>
        <ul>
          {this.props.startProf.map((prof, index) =>{
            return(
              <div key={index}><li>{prof.name}</li></div>
            )
          })}
        </ul>
        <h4>Additional traits from your race</h4>
        <ul>
          {this.props.traits.map((traits, index) => {
            return(
              <div key={index}>
                <li id={traits.url} onClick={this.handleSubClassFetch} style={{cursor: 'pointer'}}>{traits.name}
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    );
  }

}

export default ClassInfo;
