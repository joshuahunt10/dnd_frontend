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
      <div className='container game-config-container'>
        <h2>Create Your Heroe: Step 1 of 2</h2>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Select a Class: </label>
                </td>
                <td>
                  <select onChange={e => this.setState({classID: e.target.value})}>
                    <option value=""></option>
                    {this.state.classes.map((ppl, index) => {
                      return(
                          <option key={index} value={ppl.url.substring(ppl.url.lastIndexOf('/') + 1)}>{ppl.name}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Select a Race: </label>

                </td>
                <td>
                  <select onChange={e => this.setState({raceID: e.target.value})}>
                    <option value=""></option>
                    {this.state.races.map((races, index) => {
                      return(
                        <option key={index} value={races.url.substring(races.url.lastIndexOf('/') +1)}>{races.name}</option>
                      )
                    })}
                  </select>

                </td>
              </tr>
            </tbody>
          </table>

          <button className="btn btn-success char-butt-one" type="submit">On to Step 2</button>
        </form>

      </div>
    );
  }
}
export default CharCreate;
