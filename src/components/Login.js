import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import localStorage from 'local-storage'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: null,
      redirect: false
    }
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleEmailInput(e){
      this.setState({
        email: e.target.value
      })
  }

  handlePasswordInput(e){
      this.setState({
        password: e.target.value
      })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state)
    fetch('http://localhost:4000/api/authenticate', {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log('json in the login page', json)
      localStorage.set("JWT", json.token)
      this.setState({redirect: true})

    })
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/dashboard" />
    }
    return (
      <div>
        <h3>This is the Login page</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input type='email' placeholder="Email" onChange={this.handleEmailInput} value={this.state.email}/>
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder="Password" onChange={this.handlePasswordInput} value={this.state.password}/>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

}

export default Login;
