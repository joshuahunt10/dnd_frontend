import React, { Component } from 'react';

class AllProf extends Component {

  render() {
    return (
      <div className="char-field container">
          <h4>Proficiencies:</h4>
          <ul>
            {this.props.skillProf.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
          <h4>Armor and Weapon Profeciencies</h4>
          <ul>
            {this.props.proficiencies.map((prof, index) => {
              return (
                <div key={index}>
                  <li>{prof.name}</li>
                </div>
              )
            })}
          </ul>
          <h4>Profeciencies from your race</h4>
          <ul>
            {this.props.traits.map((prof, index) => {
              return (
                <div key={index}>
                  <li>{prof.name}</li>
                </div>
              )
            })}
          </ul>
      </div>
    );
  }

}

export default AllProf;
