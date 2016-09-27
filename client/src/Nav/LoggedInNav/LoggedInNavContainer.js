import React, { PropTypes } from 'react'
import LoggedInNav from './LoggedInNav'
import SignInNav from './SignInNav'
import axios from 'axios'
import { Router, Route, IndexRoute, Link } from 'react-router'


class LoggedInNavContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: true
      };
    } 

    componentWillMount() {
      
      //Some server query to find the session status of client joining app

      //Create logic to check if session is true or not
        //if true, loggedInNav should show
        //else, signInNav should show
    }

    toggle() {
      this.setState({loggedIn: !this.state.loggedIn})
    }

  signingIn(e,user, password) {
    e.preventDefault();
    console.log('User ',user, ' Password ', password);
    //Create logic for checking user and password

    //when we see confirmation of user, move user to their profile page
    //browserHistory.push('/' + user);
  }
 
  render() {
    return(
      <div>
        <LoggedInNav/>
      </div>
      )
  }

}


export default LoggedInNavContainer;