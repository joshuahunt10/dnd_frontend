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
      redirect: "",
      message: ""
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
    this.setState({message: ""})
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
      if (json.success){
        localStorage.set("JWT", json.token)
        this.setState({redirect: true})
      } else {
        this.setState({message: json.message})
      }

    })
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/dashboard" />
    }
    return (
      <div className='login-wrapper'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <h3>Login:</h3>
          {this.state.message &&
            <div className="error">{this.state.message}</div>
          }
          <label htmlFor='email'>Email:</label>
          <input type='email' className="form-control" placeholder="Email" aria-describedby="emailHelp" onChange={this.handleEmailInput} value={this.state.email}/>
          <label htmlFor='password'>Password:</label>
          <input type='password' className="form-control" placeholder="Password" onChange={this.handlePasswordInput} value={this.state.password}/>
          <button className="btn btn-success" id='login-butt' type="submit">Login</button>
        </form>
      </div>
    );
  }

}

export default Login;
