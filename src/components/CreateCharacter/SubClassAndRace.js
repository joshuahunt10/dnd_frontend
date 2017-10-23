import React, {Component} from 'react';

class SubClassAndRace extends Component {

  render() {
    return (
      <div className="char-field container">
        <fieldset>
          <legend>
            Options for subclasses and subraces
          </legend>
          <h4>Subclasses:
          </h4>
          {this.props.subclasses.map((sc, index) => {
            return (
              <div key={index}>
                <input type="radio" value={sc.name} name='subclass' onChange={this.props.handleSubClassCheckBox}/>
                <span className="profChoices" id={sc.url} onClick={this.props.handleSubClassFetch} style={{
                  cursor: 'pointer'
                }}>{sc.name}</span><br/>

                <input type='radio' value='other' name='subclass' id='radio-other' onChange={e => this.props.handleStateUpdate("textBoxDisable", false)}/>
                <span>Other:
                  <input id='other-input' type='text' disabled={this.props.textBoxDisable} onChange={e =>  this.props.handleStateUpdate("subClass", e.target.value)}/></span>
              </div>
            )
          })}
          <h4>Subraces:</h4>
          {this.props.subraces.map((sr, index) => {
            return (
              <div key={index}>
                <input type="radio" name='subRace' value={sr.name} onChange={e => this.props.handleStateUpdate("subRace", e.target.value)}/>
                <label className="profChoices" id={sr.url} onClick={this.props.handleSubRaceFetch} style={{
                  cursor: 'pointer'
                }}>{sr.name}</label>
                <br/>
                <input type='radio' value='other' name='subRace' id='radio-other' onChange={e => this.props.handleStateUpdate("subRaceDisable", false)}/>
                <span>Other:
                  <input id='other-input' type='text' disabled={this.props.subRaceDisable} onChange={e => this.props.handleStateUpdate("subRace", e.target.value)}/></span>
              </div>
            )
          })}
        </fieldset>
      </div>
    );
  }

}

export default SubClassAndRace;
