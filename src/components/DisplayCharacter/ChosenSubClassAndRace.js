import React, { Component } from 'react';

class ChosenSubClassAndRace extends Component {

  render() {
    return (
      <div className="char-field container">
        <fieldset>
          <legend>
            Subclasses and Subraces
          </legend>
          <h4>Subclass:
          </h4>
          {this.props.subclasses.map((sc, index) => {
            return(
              <div key={index}>
                <p id={sc.url} onClick={this.props.handleSubClassFetch} style={{cursor: 'pointer'}}>{this.props.subClass}</p>
              </div>
            )
          })}
          <h4>Subrace:</h4>
          {this.props.subraces.map((sr, index) => {
            return(
              <div key={index}>
                <p id={sr.url} onClick={this.props.handleSubRaceFetch} style={{cursor: 'pointer'}}>{this.props.subRace}</p>
              </div>
            )
          })}
        </fieldset>
      </div>
    );
  }

}

export default ChosenSubClassAndRace;
