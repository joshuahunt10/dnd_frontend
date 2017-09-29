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
    fetch(`${process.env.REACT_APP_API_SERVER}/api/authenticate`,{
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
    let errorStyling = ''
    let errorDiv= ''
    if(this.state.message){
      errorStyling = 'errorStyling'
      errorDiv = (
        <div className="loginError">{this.state.message}</div>
      )
    }
    return (
      <div className='login-wrapper'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <h3>Login:</h3>
          {errorDiv}
          <label htmlFor='email'>Email:</label>
          <input type='email' className={'form-control ' + errorStyling} placeholder="Email" aria-describedby="emailHelp" onChange={this.handleEmailInput} value={this.state.email}/>
          <label htmlFor='password'>Password:</label>
          <input type='password' className={'form-control ' + errorStyling} placeholder="Password" onChange={this.handlePasswordInput} value={this.state.password}/>
          <button className="btn btn-success" id='login-butt' type="submit">Login</button>
        </form>
      </div>
    );
  }

}

export default Login;
