import React, { PropTypes } from 'react'
import LoggedOutNav from './LoggedOutNav'
import axios from 'axios'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'


class LoggedOutNavContainer extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        exist: false
      }
    } 


  loggingIn(username, password) {
    console.log('User ',username, ' Password ', password);
    //Create logic for checking user and password
    var userInfo = {username: username, password: password};

    axios.post('/login', userInfo)
    .then((res)=>{
      console.log('what is my res data for loggin in???',res.data);
      console.log('checking router', this.context.router);
      if (res.data[0].username) {
        //TODO: FIgure out what server gives for emojis
        this.props.dispatch(userActions.updateUser(res.data[0]));
        this.props.dispatch(userActions.userAuth());
        let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
        let options = {

          method: 'POST',
          headers: myHeaders,
          body: `
            { 
              
              findFriends(username: \"${username}\")
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
            if(friends) {
              var onlineFriends = friends.filter(friend => friend.online = true);
              this.props.dispatch(userActions.updateFriends(friends));
              this.props.dispatch(userActions.updateOnlineFriends(onlineFriends));
              this.props.dispatch(userActions.updateFriendCount(friends.length));
              console.log('user name',username);
              let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
              let options = {

                method: 'POST',
                headers: myHeaders,
                body: `
                    mutation {
                    updateUser(username: \"${username}\" online: true)  {
                      username
                    }
                    }
                    `
              };
              
            }
            fetch('/graphql', options).then((res) =>{
              return res.json().then((data) => {
              console.log('going to profile')
              this.context.router.push('/profile');
          })
        })
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
        <LoggedOutNav loggingIn = {this.loggingIn.bind(this)} exist={this.state.exist}/>
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