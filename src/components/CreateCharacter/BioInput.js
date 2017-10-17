import React, { Component } from 'react';

class BioInput extends Component {

  render() {
    return (
      <div className="char-field container">
        <fieldset>
          <legend>Bio</legend>
          <textarea rows='15' onChange={e => this.props.handleStateUpdate('bio', e.target.value)} value={this.props.bio} placeholder="Where did your character come from?"></textarea>
        </fieldset>
      </div>
    );
  }

}

export default BioInput;
