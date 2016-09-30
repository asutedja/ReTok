import React, { PropTypes } from 'react'
import LoggedInNav from './LoggedInNav'
import SignInNav from './SignInNav'
import axios from 'axios'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link } from 'react-router'
import io from 'socket.io-client'
import * as userActions from '../../Redux/userReducer'


class LoggedInNavContainer extends React.Component {
  constructor(props, context) {
      super(props, context);
      //states are used to control when to show chat button on client to allow them to enter a chat together
      this.state = {
        toggle: null,
        hide: false
      }
  } 

  componentWillMount() {

    var socket = io();
    console.log('socket' , socket)
    this.props.dispatch(userActions.sendSocket(socket));

    socket.on('invite', function(room) {
      this.invitation();
      this.props.dispatch(userActions.createRoom(room));
      console.log(room)
      //peer should have room info

    }.bind(this))

  }
    
  
  logout() {
    var socket = this.props.socket;
    axios.get('/logout');
    this.props.dispatch(userActions.toggleLogIn(false));
    this.props.dispatch(userActions.sendSocket(null))
    socket.disconnect()
    this.context.router.push('/')
  }

  invitation() {

    this.setState({
      hide:true
    })
    var toggling = setInterval(function() {
      var background = document.getElementById('chat').style.backgroundColor;
       if (background == "rgb(255, 145, 0)") {
           document.getElementById('chat').style.background = "rgb(26,255,0)";
       } else {
           document.getElementById('chat').style.background = "rgb(255,145,0)";
       }
    })


    this.setState({
      toggle: toggling
    })

    console.log('inviting')
  }

  accept() {
    clearInterval(this.state.toggle);
    document.getElementById('chat').style.background = "#4d4d4d";
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
        <LoggedInNav hide={this.state.hide} logout= {this.logout.bind(this)} accept={this.accept.bind(this)} searchReTok={this.searchReTok.bind(this)}/>
      </div>
      )
  }

}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    search: state.userReducer.search,
    room: state.userReducer.room,
    socket: state.userReducer.socket
  }
}

LoggedInNavContainer.contextTypes = {
  router: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(LoggedInNavContainer)

