import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class CharCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      classID: null,
      classSelected: false,
      races: [],
      raceID: "",
      raceSelected: false
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
    fetch('http://www.dnd5eapi.co/api/races')
    .then(r => r.json())
    .then(json => {
      console.log('json of races',json);
      this.setState({
        races: json.results
      })
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({
      classSelected: true,
      raceSelected: true
    })
  }

  render() {
    if(this.state.classSelected && this.state.raceSelected){
      return <Redirect to={`/dashboard/charcreate/${this.props.match.params.gameId}/${this.state.classID}/${this.state.raceID}`}/>
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
          <select onChange={e => this.setState({raceID: e.target.value})}>
            <option value=""></option>
            {this.state.races.map((races, index) => {
              return(
                <option key={index} value={races.url.substring(races.url.lastIndexOf('/') +1)}>{races.name}</option>
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
