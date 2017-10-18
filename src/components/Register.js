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
      registerSuccess: false
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
    if(name){
      console.log('name is good')
      return true
    }
    else{
      console.log('NAME is not filled in!')
      return 'Please input your name'
    }
  }

  emailInput = (email) => {
    if(email){
      console.log('email is good');
      return true
    }
    else{
      console.log('EMAIL is not filled in');
      return false
    }
  }

  passwordInput = (password, confPassword) => {
    if(this.state.password === this.state.confPassword){
      console.log('passwords entered')
      return true
    }
    else{
      console.log('PASSWORDS are bad');
      return false
    }
  }

  passwordLength = (password) =>{
    if(password.length < 6){
      console.log('password too short')
      return false
    }
    else{
      return true
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
    let formValues = [this.state.email, this.state.name, this.state.password, this.state.confPassword, this.state.bio]
    let allInputsPass = false

    let name = this.nameInput(this.state.name)

    if(this.nameInput(this.state.name) && this.emailInput(this.state.email) && this.passwordInput(this.state.password, this.state.confPassword) && this.passwordLength(this.state.password) && this.state.confPassword){
      console.log('all form is good');
    }
    else{
      console.log('something is bad')
    }


    if(this.state.registerSuccess){
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
        console.log(json)
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
    else{
      console.log('form failed');
    }

  }

  render() {
    if(this.state.registerSuccess === true){
      return <Redirect to='login' />
    }
    return (
      <div className='container registration-wrapper'>
        <form className="registration-form container" onSubmit={this.handleSubmit}>
          <h3 className="form-title">Create Your Account</h3>
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
