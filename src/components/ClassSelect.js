import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class CharCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      classID: null,
      classSelected: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    fetch('http://www.dnd5eapi.co/api/classes')
    .then(r => r.json())
    .then(json => {
      this.setState({
        classes: json.results
      })
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({
      classSelected: true
    })
  }

  render() {
    if(this.state.classSelected){
      return <Redirect to={'/dashboard/charcreate/' + this.state.classID} />
    }
    return (
      <div>
        <h2>This is the form to create a character</h2>
        <form onSubmit={this.handleSubmit}>
          <select onChange={e => this.setState({classID: e.target.value})}>
            <option value=""></option>
            {this.state.classes.map((ppl, index) => {
              return(
                  <option key={index} value={ppl.url.substring(ppl.url.lastIndexOf('/') + 1)}>{ppl.name}</option>
              )
            })}

          </select>
          <button type="submit">Select Class</button>
        </form>

      </div>
    );
  }

}


export default CharCreate;
