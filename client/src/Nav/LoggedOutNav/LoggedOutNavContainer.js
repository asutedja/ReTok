import React, { PropTypes } from 'react'
import LoggedOutNav from './LoggedOutNav'
import axios from 'axios'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'


class LoggedOutNavContainer extends React.Component {
    constructor(props, context) {
      super(props, context);

    } 


  loggingIn(username, password) {
    console.log('User ',username, ' Password ', password);
    //Create logic for checking user and password
    var userInfo = {username: username, password: password};

    axios.post('/login', userInfo)
    .then((res)=>{
      console.log('what is my res data for loggin in???',res.data);
      console.log('checking router', this.context.router);
      if (res.data.user[0].username) {

        this.props.dispatch(userActions.updateUser(res.data.user[0]));
        this.props.dispatch(userActions.userAuth());

        let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
        let options = {

          method: 'POST',
          headers: myHeaders,
          body: `
            {
              b: updateUser(username: \"${username}\" online: true)    
              
              a: findFriends(username: \"${username}\")
              {
                    username
                    password
                    profilePic
                    firstName
                    lastName
                    email
                    online
                  }
            }`

        };
        fetch('/graphql', options).then((res) =>{
          return res.json().then((data) => {
            console.log('checking my friends data',data.data.findFriends);
            var friends = data.data.findFriends;
            var onlineFriends = friends.filter(friend => friend.online = true);
            this.props.dispatch(userActions.updateFriends(friends));
            this.props.dispatch(userActions.updateOnlineFriends(onlineFriends));
            this.props.dispatch(userActions.updateFriendCount(friends.length));
            this.context.router.push('/profile');
          })
        })


      } else {
        this.setState({
          exist:true
        })
      }
    });


  }
 
  render() {
    return(
      <div>
        <LoggedOutNav loggingIn = {this.loggingIn.bind(this)}/>
      </div>
      )
  }

}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn
  }
}

LoggedOutNavContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(LoggedOutNavContainer)