import React, { Component } from 'react';
import {BrowserRouter, Switch} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Route from './CustomRoute'

import BaseLayout from './BaseLayout';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard'
import currentUser from '../currentUser'
import '../styles/App.css';

const Splash = () => <div>Oh Hai</div>

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   token: ""
    // }

  }

  //
  // componentDidMount(){
  //   fetch('http://localhost:4000/api/user')
  //   .then(r => r.json())
  //   .then(data => {
  //     this.setState({
  //       user: data.user
  //     })
  //   })
  // }

  render() {

    return (
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            {/* <Route path='/login' render={ () => <Login onLogin={this.onLogin}/> } /> */}
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login}/>


            {/* <Route path='/dashboard' render={ () => <Dashboard token={this.state.token} />} /> */}
            {/* <PrivateRoute path='/dashboard' render={ () => <Dashboard token={this.state.token} />} /> */}
            <Route path='/dashboard'  component={Dashboard} />
            <Route path='/' component={Splash} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    );
  }
}

export default App;
