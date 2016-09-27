import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import userReducer from '../client/src/Redux/userReducer.js'
<<<<<<< cd2ada7c3871fefef2d14e33b9253aa77ae4fc42
import * as userActions from '../client/src/Redux/userReducer.js'
=======
>>>>>>> Bring peerRTCConnection to our client unfunctionally
//import App from '../client/src/App.js'


describe(' userReducer', () => {
  it('should return the initial state', () => {
    expect(
      userReducer(undefined, {})
    ).toEqual({
<<<<<<< cd2ada7c3871fefef2d14e33b9253aa77ae4fc42
        userID: '',
        user: {username: 'buddyboowaggytails', password: 'abcd1234', firstName: 'Boo', lastName: 'theDog', email: 'buddyboo@gmail.com', dob: '9/9/1999', profilePic: 'http://images5.fanpop.com/image/photos/31300000/-Boo-Buddy-boo-and-buddy-31314627-403-403.jpg', coin: 0, emoji: ''},
        friends: [{username: 'andersoncooper', profilePic: 'https://img.buzzfeed.com/buzzfeed-static/static/2013-10/enhanced/webdr06/15/14/enhanced-buzz-8404-1381861542-6.jpg', date: '06/10/2016'}, {username: 'human', profilePic: 'http://allthingsd.com/files/2012/08/531287_10151443421215398_1956136074_n-380x285.jpeg', date: '08/10/2016'}, {username: 'buddy', profilePic: 'http://cdn1.boothedog.net/wp-content/uploads/2011/07/boo-the-dog-300x255.jpg', date: '09/10/2016'}],
        isLoggedIn: false,
        error: '',
        emojis: []
    })
  })

  // it('should return new user' () => {
  //   expect(
  //     userReducer(undefined, userActions.updateUser({username: 'andrew', password: 'abcd1234', firstName: 'Boo', lastName: 'theDog', email: 'buddyboo@gmail.com', dob: '9/9/1999', profilePic: 'http://images5.fanpop.com/image/photos/31300000/-Boo-Buddy-boo-and-buddy-31314627-403-403.jpg', coin: 0, emoji: ''}))).toEqual({userID: '',
  //       user: {username: 'andrew', password: 'abcd1234', firstName: 'Boo', lastName: 'theDog', email: 'buddyboo@gmail.com', dob: '9/9/1999', profilePic: 'http://images5.fanpop.com/image/photos/31300000/-Boo-Buddy-boo-and-buddy-31314627-403-403.jpg', coin: 0, emoji: ''},
  //       friends: [{username: 'andersoncooper', profilePic: 'https://img.buzzfeed.com/buzzfeed-static/static/2013-10/enhanced/webdr06/15/14/enhanced-buzz-8404-1381861542-6.jpg', date: '06/10/2016'}, {username: 'human', profilePic: 'http://allthingsd.com/files/2012/08/531287_10151443421215398_1956136074_n-380x285.jpeg', date: '08/10/2016'}, {username: 'buddy', profilePic: 'http://cdn1.boothedog.net/wp-content/uploads/2011/07/boo-the-dog-300x255.jpg', date: '09/10/2016'}],
  //       isLoggedIn: false,
  //       error: '',
  //       emojis: []
  //     })
  // })
});

describe('actions', () => {
  it('should create an action', () => {
    const newUser = {username: 'andrew', password: 'abcd1234', firstName: 'Boo', lastName: 'theDog', email: 'buddyboo@gmail.com', dob: '9/9/1999', profilePic: 'http://images5.fanpop.com/image/photos/31300000/-Boo-Buddy-boo-and-buddy-31314627-403-403.jpg', coin: 0, emoji: ''}

    const expectedAction = {
      type:'UPDATE_USER',
      user: newUser
    }

    expect(userActions.updateUser(newUser)).toEqual(expectedAction)

  })
})
=======
  userID: '',
  user: {username: 'buddyboowaggytails', password: 'abcd1234', firstName: 'Boo', lastName: 'theDog', email: 'buddyboo@gmail.com', dob: '9/9/1999', profilePic: 'http://images5.fanpop.com/image/photos/31300000/-Boo-Buddy-boo-and-buddy-31314627-403-403.jpg', coin: 0, emoji: ''},
  friends: [{username: 'andersoncooper', profilePic: 'https://img.buzzfeed.com/buzzfeed-static/static/2013-10/enhanced/webdr06/15/14/enhanced-buzz-8404-1381861542-6.jpg', date: '06/10/2016'}, {username: 'human', profilePic: 'http://allthingsd.com/files/2012/08/531287_10151443421215398_1956136074_n-380x285.jpeg', date: '08/10/2016'}, {username: 'buddy', profilePic: 'http://cdn1.boothedog.net/wp-content/uploads/2011/07/boo-the-dog-300x255.jpg', date: '09/10/2016'}],
  isLoggedIn: false,
  error: '',
  emojis: []
})
  })


});
>>>>>>> Bring peerRTCConnection to our client unfunctionally


