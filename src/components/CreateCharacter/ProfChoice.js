import React, { Component } from 'react';

class ProfChoice extends Component {

  render() {
    return (
      <div className="char-field container">
        <fieldset>
          <legend>Choose {this.props.numChoices} proficiencies from the below list:</legend>
          {this.props.choices.map((skill, index) => {
            return(
              <div key={index}>
                <input type='checkbox' onChange={this.props.handleProfCheckBox} value={skill.name}/>
                <label>{skill.name}</label>
              </div>
            )
          })}
        </fieldset>
      </div>
    );
  }

}

export default ProfChoice;
