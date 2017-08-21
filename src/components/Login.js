import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import currentUser from '../currentUser'

class Login extends Component {
  static isPrivate = false


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: null
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
      console.log(json);
      this.setState({
        email: '',
        password: '',
        token: json.token
      })
      // If we're using redux
      // this.props.dispatch({type: "SIGNIN", token: json.token})
      alert("onLogin")
      this.setState({token: json.token})
      currentUser.token = json.token
      console.log('currentuser',currentUser.token);
    })
  }

  render() {
    if(this.state.token){
      return <Redirect
        to={{
          pathname: "/dashboard",
          state: {token: this.state.token}
        }}
       /> //pass the token down as props.  Then I can fetch the user data in the dashboard
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
