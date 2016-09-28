import React, { PropTypes } from 'react'
import LoggedInNav from './LoggedInNav'
import SignInNav from './SignInNav'
import axios from 'axios'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'


class LoggedInNavContainer extends React.Component {
    constructor(props, context) {
      super(props, context);
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



  searchReTok(query) {

    if (query.indexOf(' ') !== -1) {
      query = query.split(' ')[0];
    }

    let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
    let options = {

      method: 'POST',
      headers: myHeaders,
      body: `
        {

          users(firstName: \"${query}\")
              {
               id
               username
               password
               firstName
               lastName
               email   
               profilePic
              }
        }`


    };
    fetch('/graphql', options).then((res) =>{
      return res.json().then((data) => {
        var searchresult = data.data.users.slice();
        console.log('what is my data from my search bar', searchresult);

        this.props.dispatch(userActions.updateSearch(searchresult));
        console.log('checking router', this.context.router);
        this.context.router.push('/search')
        })
    })





    // console.log(username);
    // this.props.dispatch(userActions.updateSearch(username));
    // this.context.router.push('/search');
  }

 
  render() {
    return(
      <div>
        <LoggedInNav searchReTok={this.searchReTok.bind(this)}/>
      </div>
      )
  }

}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    search: state.userReducer.search
  }
}

LoggedInNavContainer.contextTypes = {
  router: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(LoggedInNavContainer)