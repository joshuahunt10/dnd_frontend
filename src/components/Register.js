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
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
    this.handleConfPasswordInput = this.handleConfPasswordInput.bind(this)
    this.handleBioInput = this.handleBioInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleEmailInput(e){
      this.setState({
        email: e.target.value
      })
  }

  handleNameInput(e){
      this.setState({
        name: e.target.value
      })
  }

  handlePasswordInput(e){
      this.setState({
        password: e.target.value
      })
  }

  handleConfPasswordInput(e){
      this.setState({
        confPassword: e.target.value
      })
  }

  handleBioInput(e){
      this.setState({
        bio: e.target.value
      })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state);
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

  render() {
    if(this.state.registerSuccess === true){
      return <Redirect to='login' /> //need to pass props down to the login page to display that shows the registration was a success message on the login page.
    }
    return (
      <div>
        <h3>This is the registration page</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input type='text' placeholder='Name' onChange={this.handleNameInput} value={this.state.name}/>
          <label htmlFor='email'>Email</label>
          <input type='email' placeholder='Email' onChange={this.handleEmailInput} value={this.state.email}/>
          <label htmlFor='password'>Password</label>
          <input type='password' placeholder='Password' onChange={this.handlePasswordInput} value={this.state.password}/>
          <label htmlFor='confirm_password'>Confirm Password</label>
          <input type='password' placeholder='Confirm Password' onChange={this.handleConfPasswordInput} value={this.state.confPassword}/>
          <label htmlFor='bio'>Bio</label>
          <textarea rows="5" cols="100" placeholder="Enter a Bio" onChange={this.handleBioInput} value={this.state.bio}/>
          <button type="submit">Register!</button>
        </form>
      </div>
    );
  }

}

export default Register;
