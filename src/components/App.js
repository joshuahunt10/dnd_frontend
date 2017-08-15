import React, { Component } from 'react';

import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    fetch('http://localhost:4000/api/user')
    .then(r => r.json())
    .then(data => {
      this.setState({
        user: data.user
      })
    })
  }

  render() {
    console.log('logging the state', this.state);
    return (
      <div className="App">
        <h1>Return from the db</h1>
        <p>{this.state.user.name}</p>
      </div>
    );
  }
}

export default App;
