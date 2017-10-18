import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'

import BaseLayout from './BaseLayout';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard'
import Splash from './Splash'
import ClassSelect from './ClassSelect'
import GameTables from './GameTables'
import GameConfig from './GameConfig'
import ClassDetails from './ClassDetails'
import GameCharDetails from './GameCharDetails'
import '../styles/App.css';

class App extends Component {
  render() {

    return (
      <BrowserRouter>
        <BaseLayout>
          <AuthenticatedRoute exact path='/dashboard'  component={Dashboard} />
          <AuthenticatedRoute path='/dashboard/charcreate/:gameId' component={ClassSelect} />
          <AuthenticatedRoute exact path='/dashboard/game/:gameId' component={GameConfig} />
          <AuthenticatedRoute path ='/dashboard/game/:gameId/:charId' component={GameCharDetails} />
          <AuthenticatedRoute path ='/dashboard/charcreate/:gameId/:classID/:raceID' component={ClassDetails} />
          <AuthenticatedRoute path='/dashboard/tables' component={GameTables} />
          <Route path='/login' render={ () => <Login onLogin={this.onLogin}/> } />
          <Route path='/register' component={Register} />
          <Route exact path='/' component={Splash} />
        </BaseLayout>
      </BrowserRouter>
    );
  }
}

export default App;
