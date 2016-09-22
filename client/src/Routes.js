import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Login from './Login'
import Navbar from './Navbar'
import Home from './Home'
import Profile from './Profile'
import Store from './Store'
import Chat from './Chat'
 
render((
  <Router history={browserHistory}>
  	 <Route path="/" component={Login}/>
    <Route path="/home" component={Navbar}/>
    <Route path="/me" component={Home}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/store" component={Store}/>
    <Route path="/chat" component={Chat}/>
  </Router>
), document.getElementById('app'))