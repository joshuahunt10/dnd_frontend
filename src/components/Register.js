import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      confPassword: '',
      bio: '',
      registerSuccess: false,
      errorArray: []
    }
  }
  handleEmailInput = (e) => {
      this.setState({
        email: e.target.value
      })
  }

  handleNameInput = (e) => {
      this.setState({
        name: e.target.value
      })
  }

  handlePasswordInput = (e) => {
      this.setState({
        password: e.target.value
      })
  }

  handleConfPasswordInput = (e) => {
      this.setState({
        confPassword: e.target.value
      })
  }

  handleBioInput = (e) => {
      this.setState({
        bio: e.target.value
      })
  }

  nameInput = (name) => {
    if(!name){
      return 'Please input your name'
    }
  }

  emailInput = (email) => {
    if(!email){
      return 'Please input your email'
    }
  }

  passwordInput = (password, confPassword) => {
    if(this.state.password !== this.state.confPassword){
      return 'Password do not match'
    }
  }

  passwordLength = (password) =>{
    if(password.length < 6){
      return 'Password must be at least 6 characters long'
    }
  }

  formValidate = (e, name, email, password, confPassword) => {
    e.preventDefault()
    let errors = []
    let errorList = []
    errors = [this.nameInput(this.state.name), this.emailInput(this.state.email), this.passwordLength(this.state.password), this.passwordInput(this.state.password, this.state.confPassword)]
    errors.forEach(msg => {
      if(typeof msg === 'string'){
        errorList.push(msg)
      }
    })
    if(errorList.length === 0){
      this.setState({
        errorArray: errorList,

      }, this.handleSubmit())
    }
    else{
      this.setState({
        errorArray: errorList,
      })
    }
  }

  handleSubmit = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/api/register`,{
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        bio: this.state.bio
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      if (json.status === 'success'){
        this.setState({
          email: '',
          name: '',
          password: '',
          confPassword: '',
          bio: '',
          registerSuccess: true
        })
      }
    })
  }

  render() {
    if(this.state.registerSuccess === true){
      return <Redirect to='login' />
    }
    return (
      <div className='container registration-wrapper'>
        <form className="registration-form container" onSubmit={this.formValidate}>
          <h3 className="form-title">Create Your Account</h3>
          <ul>
          {this.state.errorArray.map((err, index) => {
            return(
              <li key={index}>{err}</li>
            )
          })}
          </ul>
          <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input className="form-control" type='text' placeholder='Name' onChange={this.handleNameInput} value={this.state.name}/>
            <div className="invalid-feedback">
              Please provide your name.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input className="form-control" type='email' placeholder='Email' onChange={this.handleEmailInput} value={this.state.email}/>
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input className="form-control" type='password' placeholder='Password' onChange={this.handlePasswordInput} value={this.state.password}/>
          </div>
          <div className="form-group">
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input className="form-control" type='password' placeholder='Confirm Password' onChange={this.handleConfPasswordInput} value={this.state.confPassword}/>
          </div>
          <div className="form-group">
            <label htmlFor='bio'>Bio</label>
            <textarea className="form-control" rows="5" cols="100" placeholder="Enter a Bio" onChange={this.handleBioInput} value={this.state.bio}/>
          </div>
          <button className="btn btn-success" type="submit">Register!</button>
        </form>
      </div>
    );
  }

}

export default Register;
