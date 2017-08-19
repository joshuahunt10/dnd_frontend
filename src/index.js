import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import App from './components/App';
import BaseLayout from './components/BaseLayout';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'




ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' component={App} />
      </Switch>
    </BaseLayout>
  </BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();
