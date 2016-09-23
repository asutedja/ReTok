import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const LoggedInNav = (props) => {

  return (
    <div className="nav">
      <Link to="/" className="logo">ReTok</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  )
}

export default LoggedInNav