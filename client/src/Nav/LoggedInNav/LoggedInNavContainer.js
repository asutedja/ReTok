import React, { PropTypes } from 'react'
import LoggedInNav from './LoggedInNav'
import SignInNav from './SignInNav'
import axios from 'axios'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link } from 'react-router'
import * as userActions from '../../Redux/userReducer'
import friendTierCalculator from '../../friendTierCalculator.js'


class LoggedInNavContainer extends React.Component {
  constructor(props, context) {
      super(props, context);
      //states are used to control when to show chat button on client to allow them to enter a chat together
      this.state = {
        toggle: null,
        hide: false
      }
  } 

  tierRanking(friends) {
    var rankedFriends = [];
    var num = 0;
    if (friends.length <= 5) {
      num = friends.length;
    } else if (friends.length <= 20 && friends.length > 5) {
      num = Math.min(5, friends.length);
    } else {
      num = Math.min(10, friends.length);
    }
    for (var i = 0; i < num; i++) {
      rankedFriends.push(friends[i]);
    }
    return rankedFriends;
  }

  componentWillMount() {

    var socket = io();
    console.log('socket' , socket)
    this.props.dispatch(userActions.sendSocket(socket));
    this.props.dispatch(userActions.createRoom(this.props.user.username))
    var friends = this.props.friends;
    console.log(friends)
    socket.emit('updateFriends', friends);

    socket.on('invite', function(caller) {
      this.invitation();
      console.log('This should be Andrew', caller.caller)

      this.props.dispatch(userActions.createRoom(caller.caller));

      //peer should have room info

    }.bind(this))

    socket.on('update', function() {
      let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
      let options = {

        method: 'POST',
        headers: myHeaders,
        body: `
          { 
            
            findFriends(username: \"${this.props.user.username}\")
            {
                  username
                  profilePic
                  firstName
                  lastName
                  email
                  online
                  videoChatCount
                  textChatCount
                  lastChatTime
                }
          }`

      };
      fetch('/graphql', options).then((res) =>{
        return res.json().then((data) => {
          console.log('checking my friends data',data.data.findFriends);
          var friends = data.data.findFriends;
          // friendRanking() added score to each friend
          if(friends) {
            friendTierCalculator(friends);
            var onlineFriends = friends.filter(friend => friend.online === true);
            var suggestedFriends = this.tierRanking(onlineFriends.slice().sort((friend0, friend1) => {return friend1.score - friend0.score}));
            this.props.dispatch(userActions.updateFriends(friends.slice()));
            this.props.dispatch(userActions.updateOnlineFriends(onlineFriends.slice()));
            this.props.dispatch(userActions.updateSuggestedFriends(suggestedFriends.slice()));
            this.props.dispatch(userActions.updateFriendCount(friends.length));
          }
        })
      })
    }.bind(this))
    

  }
    
  
  logout() {
    var socket = this.props.socket;
    axios.get('/logout');
    this.props.dispatch(userActions.toggleLogIn(false));

    let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
    let options = {

      method: 'POST',
      headers: myHeaders,
      body: `mutation
        {
          updateUser(username:"${this.props.user.username}" online: false) 
          {
            username
            online
          }
        }`
    };
    fetch('/graphql', options).then((res) =>{
      return res.json().then((data) => {
          console.log(data);
        })
    })
    .catch((error) => console.log(error))
    socket.emit('updateFriends', this.props.friends);
    socket.disconnect()
    this.props.dispatch(userActions.sendSocket(null))
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
    this.setState({
      hide:false
    })
    this.context.router.push('/chat')
  }



  searchReTok(query) {

    if (query.indexOf(' ') !== -1) {
      query = query.split(' ')[0];
    }
    console.log('IAM SEARCHING FOR', query)
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
        console.log('THIS DATA GETS SLICED', data)
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
        <LoggedInNav coin={this.props.user.coin}hide={this.state.hide} logout= {this.logout.bind(this)} accept={this.accept.bind(this)} searchReTok={this.searchReTok.bind(this)}/>
      </div>
      )
  }

}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    search: state.userReducer.search,
    user: state.userReducer.user,
    room: state.userReducer.room,
    socket: state.userReducer.socket,
    friends: state.userReducer.friends
  }
}

LoggedInNavContainer.contextTypes = {
  router: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(LoggedInNavContainer)

