
// ------ ACTIONS FOR USER REDUCER --------- //
export function userAuth (userID) {
  return {
    type: 'USER_AUTH',
    isLoggedIn: true,
    userID
  }
}

export function toggleLogIn(bool){
  return {
    type: 'TOGGLE_LOGIN',
    isLoggedIn: bool,
  }
}

export function userUnauth () {
  return {
    type: 'USER_UNAUTH',
    isLoggedIn: false,
  }
}

// export function fetchUserSuccess (user) {
//   return {
//     type: 'FETCHING_USER_SUCCESS',
//     user,
//   }
// }

export function updateUser (user) {
  return {
    type: 'UPDATE_USER',
    user,
  }
}

export function updateFriends (friends) {
  return {
    type: 'UPDATE_FRIENDS',
    friends,
  }
}

export function updateEmojis (emoji) {
  return {
    type: 'UPDATE_EMOJIS',
    emojis,
  }
}


// ----- SET USER REDUCER INITIAL STATE ------ //
const userInitialState = {
  userID: '',
  user: {username: 'buddyboowaggytails', password: 'abcd1234', firstName: 'Boo', lastName: 'theDog', email: 'buddyboo@gmail.com', dob: '9/9/1999', profilePic: 'http://images5.fanpop.com/image/photos/31300000/-Boo-Buddy-boo-and-buddy-31314627-403-403.jpg', coin: 0, emoji: ''},
  friends: [{username: 'andersoncooper', profilePic: 'https://img.buzzfeed.com/buzzfeed-static/static/2013-10/enhanced/webdr06/15/14/enhanced-buzz-8404-1381861542-6.jpg', date: '06/10/2016'}, {username: 'human', profilePic: 'http://allthingsd.com/files/2012/08/531287_10151443421215398_1956136074_n-380x285.jpeg', date: '08/10/2016'}, {username: 'buddy', profilePic: 'http://cdn1.boothedog.net/wp-content/uploads/2011/07/boo-the-dog-300x255.jpg', date: '09/10/2016'}],
  isLoggedIn: false,
  error: '',
  emojis: []
}

// ------------ USER REDUCER -----------------//
export default function userReducer (state = userInitialState, action) {
  switch(action.type){
    case 'USER_AUTH' :  
   var a = Object.assign({isLoggedIn: true}, state)
   return a;

    case 'USER_UNAUTH' : 
    var a = Object.assign({isLoggedIn: true,
      user: {},
      userID: ''
    }, state);
      return a;

    case 'TOGGLE_LOGIN' : 
       var a = Object.assign({isLoggedIn: action.isLoggedIn}, state)
      return a;

    case 'FETCHING_USER_INFO' : {
      var a = Object.assign({isFetching: true
    }, state);
      return a;
    }

    case 'UPDATE_USER' : {
      var a = Object.assign({user: action.user}, state)
      return a;
    }

    case 'UPDATE_FRIENDS' : {
      return {
        ...state,
        friends: action.friends,
      }
    }

    case 'UPDATE_EMOJIS' : {
      return {
        ...state,
        emojis: action.emojis,
      }
    }

    default : 
      return state

    }
  }