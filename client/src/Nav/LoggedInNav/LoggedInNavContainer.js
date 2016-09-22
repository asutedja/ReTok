import React, { PropTypes } from 'react'
import LoggedInNav from './LoggedInNav'
import axios from 'axios'
import { Router, Route, IndexRoute, Link } from 'react-router'

class LoggedInNavContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
 
  render() {
    return(
      <div className = 'NavContainer'>
        <LoggedInNav/>
      </div>
      )
  }

}


export default LoggedInNavContainer;