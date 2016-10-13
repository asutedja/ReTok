
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

export function updateOnlineFriends (onlineFriends) {
  return {
    type: 'UPDATE_ONLINE_FRIENDS',
    onlineFriends,
  }
}

export function updateSuggestedFriends (suggestedFriends) {
  return {
    type: 'UPDATE_SUGGESTED_FRIENDS',
    suggestedFriends,
  }
}

export function updateFriendCount (count) {
  return {
    type: 'UPDATE_FRIEND_COUNT',
    count,
  }
}
export function increaseFriendCount() {
  return {
    type: 'INCREASE_FRIEND_COUNT',
  }
}


export function updateSearch (search) {
  return {
    type: 'UPDATE_SEARCH',
    search,
  }
}

export function updateEmojis (emojis) {
  return {
    type: 'UPDATE_EMOJIS',
    emojis,
  }
}

export function updateStoreEmojis (storeEmojis) {
  return {
    type: 'UPDATE_STORE_EMOJIS',
    storeEmojis,
  }
}

export function updateUserEmojis (userEmojis) {
  return {
    type: 'UPDATE_USER_EMOJIS',
    userEmojis,
  }
}

export function updateChatLog (chatLog) {
  return {
    type: 'UPDATE_CHAT_LOG',
    chatLog,
  }
}

export function updateCurrentChat (currentChat) {
  return {
    type: 'UPDATE_CURRENT_CHAT',
    currentChat,
  }
}

export function createRoom(room) {
  return {
    type: 'CREATE_ROOM',
    room
  }
}

export function sendSocket(socket) {
  return {
    type: 'SEND_SOCKET',
    socket
  }
}

// ----- SET USER REDUCER INITIAL STATE ------ //

let persist = (key, value) => localStorage.setItem(key, value);

let restore = (key, def) => localStorage.getItem(key) || def;

let restoreDefault = (key, def) => {
  let stored = restore(key);
  console.log('checking stored', stored);
  return stored != null
    ? JSON.parse(stored)
    :def
};


// let persist = (key, value) => localStorage.setItem(key, value);

// let restore = key => localStorage.getItem(key);

// let restoreDefault = (key, def) => {
//   let stored = restore(key);
//   console.log('checking stored', stored);
//   return stored != null
//     ? JSON.parse(stored)
//     :def
// };

const userInitialState = restoreDefault('client', {
  userID: '',
  user: {username: '', password: '', firstName: '', lastName: '', email: '', dob: '', profilePic: '', coin: 0, emoji: ''},
  friends: [],
  onlineFriends: [],
  suggestedFriends: [],
  friendCount: 0,
  isLoggedIn: false,
  error: '',
  emojis: [],
  chatLog: {},
  currentChat: [],
  storeEmojis: [],
  userEmojis: [],
  search: [],
  room: '',
  socket: null,
  connection: null

});

// const userInitialState = {
// >>>>>>> rebase
//   userID: '',
//   user: {username: '', password: '', firstName: '', lastName: '', email: '', dob: '', profilePic: '', coin: 0, emoji: ''},
//   friends: [],
//   onlineFriends: [],
//   suggestedFriends: [],
//   friendCount: 0,
//   isLoggedIn: false,
//   error: '',
//   emojis: [],
//   chatLog: {},
//   currentChat: [],
//   storeEmojis: [],
//   userEmojis: [],
//   search: [],
//   room: '',
//   socket: null,
//   connection: null

// });

// const userInitialState = {
//   userID: '',
//   user: {username: '', password: '', firstName: '', lastName: '', email: '', dob: '', profilePic: '', coin: 0, emoji: ''},
//   friends: [],
//   onlineFriends: [],
//   suggestedFriends: [],
//   friendCount: 0,
//   isLoggedIn: false,
//   error: '',
//   emojis: [],
//   chatLog: {},
//   currentChat: [],
//   storeEmojis: [],
//   userEmojis: [],
//   search: [{username: '', profilePic: '', date: ''}, {username: '', profilePic: '', date: ''}, {username: '', profilePic: '', date: ''}],
//   room: '',
//   socket: null,
//   connection: null

// }

// // // ------------ USER REDUCER -----------------//
// export default function userReducer (state = userInitialState, action) {
//   switch(action.type){
//     case 'USER_AUTH' :  {
//    return {
//      ...state,
//       isLoggedIn: true,
//       }
//     }
//     case 'USER_UNAUTH' : {
//       return {
//         ...state,
//          isLoggedIn: false,
//          user: {},
//          userID: ''
//        }
//     }

//     case 'TOGGLE_LOGIN' : {
//       return {
//         ...state,
//          isLoggedIn: action.isLoggedIn,
//        }
//     }

//     case 'FETCHING_USER_INFO' : {
//       return {
//         ...state,
//          isFetching: true,
//        }
//     }

//     case 'UPDATE_USER' : {
//      return {
//        ...state,
//         user:action.user,
//       }
//     }

//     case 'UPDATE_FRIENDS' : {
//       return {
//         ...state,
//         friends: action.friends,
//       }
//     }

//     case 'UPDATE_ONLINE_FRIENDS' : {
//       return {
//         ...state,
//         onlineFriends: action.onlineFriends,
//       }
//     }

//     case 'UPDATE_SUGGESTED_FRIENDS' : {
//       return {
//         ...state,
//         suggestedFriends: action.suggestedFriends,
//       }
//     }

//     case 'UPDATE_SEARCH' : {
//       return {
//         ...state,
//         search: action.search,
//       }
//     }


//     case 'UPDATE_EMOJIS' : {
//       return {
//         ...state,
//         emojis: action.emojis,
//       }
//     }

//     case 'UPDATE_STORE_EMOJIS' : {
//       return {
//         ...state,
//         storeEmojis: action.storeEmojis,
//       }
//     }

//     case 'UPDATE_USER_EMOJIS' : {
//       return {
//         ...state,
//         userEmojis: action.userEmojis,
//       }
//     }

//     case 'UPDATE_FRIEND_COUNT' : {
//       return {
//         ...state,
//         friendCount: action.count,
//       }
//     }

//     case 'INCREASE_FRIEND_COUNT' : {
//       return {
//         ...state,
//         friendCount: state.friendCount++,
//       }
//     }

//     case 'UPDATE_CHAT_LOG' : {
//       return {
//         ...state,
//         chatLog: action.chatLog,
//       }
//     }

//     case 'UPDATE_CURRENT_CHAT' : {
//       return {
//         ...state,
//         currentChat: action.currentChat,
//       }
//     }

//     case 'CREATE_ROOM' : {
//       return {
//         ...state,
//         room: action.room
//       }
//     }

//     case 'SEND_SOCKET' : {
//       return {
//         ...state,
//         socket: action.socket
//       }
//     }


//     default : 

//       return state

//     }
//   }

  

export default function userReducer (state = userInitialState, action) {
  switch(action.type) {
    case 'USER_AUTH' :
    state = {...state, isLoggedIn: true};
    break;

    case 'USER_UNAUTH' : 
    state = {...state, isLoggedIn: false, user: {}, userID: ''};
    break;

    case 'TOGGLE_LOGIN' : 
    state = {...state, isLoggedIn: action.isLoggedIn};
    break;

    case 'FETCHING_USER_INFO' :
    state = {...state, isFetching: true};
    break;

    case 'UPDATE_USER' :
    state = {...state, user: action.user};
    break;

    case 'UPDATE_FRIENDS' :
    state = {...state, friends: action.friends};
    break;

    case 'UPDATE_ONLINE_FRIENDS' : 
    state = {...state, onlineFriends: action.onlineFriends};
    break;

    case 'UPDATE_SUGGESTED_FRIENDS' : 
    state = {...state, suggestedFriends: action.suggestedFriends};
    break;

    case 'UPDATE_SEARCH' : 
    state = {...state, search: action.search};
    break;


    case 'UPDATE_EMOJIS' :
    state = {...state, emojis: action.emojis};
    break;

    case 'UPDATE_STORE_EMOJIS' :
    state = {...state, storeEmojis: action.storeEmojis};
    break;

    case 'UPDATE_USER_EMOJIS' :
    state = {...state, userEmojis: action.userEmojis};
    break;

    case 'UPDATE_FRIEND_COUNT' : 
    state = {...state, friendCount: action.count};
    break;

    case 'INCREASE_FRIEND_COUNT' : 
    state = {...state, friendCount: state.friendCount++};
    break;

    case 'UPDATE_CHAT_LOG' : 
    state = {...state, chatLog: action.chatLog};
    break;

    case 'UPDATE_CURRENT_CHAT' : 
    state = {...state, currentChat: action.currentChat};
    break;

    case 'CREATE_ROOM' : 
    state = {...state, room: action.room};
    break;


    case 'SEND_SOCKET' : 
    state = {...state, socket: action.socket};
    break;
  }
  console.log('checking the action -->', action);
  console.log('checking state in reducer', state);
  let {connection, socket, ...serials} = state;
  persist('client', JSON.stringify(serials));
  return state;
};

// // ------------ USER REDUCER -----------------//
// export default function userReducer (state = userInitialState, action) {
//   switch(action.type){
//     case 'USER_AUTH' :  {
//    return {
//      ...state,
//       isLoggedIn: true,
//       }
//     }
//     case 'USER_UNAUTH' : {
//       return {
//         ...state,
//          isLoggedIn: false,
//          user: {},
//          userID: ''
//        }
//     }

//     case 'TOGGLE_LOGIN' : {
//       return {
//         ...state,
//          isLoggedIn: action.isLoggedIn,
//        }
//     }

//     case 'FETCHING_USER_INFO' : {
//       return {
//         ...state,
//          isFetching: true,
//        }
//     }

//     case 'UPDATE_USER' : {
//      return {
//        ...state,
//         user:action.user,
//       }
//     }

//     case 'UPDATE_FRIENDS' : {
//       return {
//         ...state,
//         friends: action.friends,
//       }
//     }

//     case 'UPDATE_ONLINE_FRIENDS' : {
//       return {
//         ...state,
//         onlineFriends: action.onlineFriends,
//       }
//     }

//     case 'UPDATE_SUGGESTED_FRIENDS' : {
//       return {
//         ...state,
//         suggestedFriends: action.suggestedFriends,
//       }
//     }

//     case 'UPDATE_SEARCH' : {
//       return {
//         ...state,
//         search: action.search,
//       }
//     }


//     case 'UPDATE_EMOJIS' : {
//       return {
//         ...state,
//         emojis: action.emojis,
//       }
//     }

//     case 'UPDATE_STORE_EMOJIS' : {
//       return {
//         ...state,
//         storeEmojis: action.storeEmojis,
//       }
//     }

//     case 'UPDATE_USER_EMOJIS' : {
//       return {
//         ...state,
//         userEmojis: action.userEmojis,
//       }
//     }

//     case 'UPDATE_FRIEND_COUNT' : {
//       return {
//         ...state,
//         friendCount: action.count,
//       }
//     }

//     case 'INCREASE_FRIEND_COUNT' : {
//       return {
//         ...state,
//         friendCount: state.friendCount++,
//       }
//     }

//     case 'UPDATE_CHAT_LOG' : {
//       return {
//         ...state,
//         chatLog: action.chatLog,
//       }
//     }

//     case 'UPDATE_CURRENT_CHAT' : {
//       return {
//         ...state,
//         currentChat: action.currentChat,
//       }
//     }

//     case 'CREATE_ROOM' : {
//       return {
//         ...state,
//         room: action.room
//       }
//     }

//     case 'SEND_SOCKET' : {
//       return {
//         ...state,
//         socket: action.socket
//       }
//     }


//     default : 

//       return state

//     }
//   }

  


// export default function userReducer (state = userInitialState, action) {
//   switch(action.type) {
//     case 'USER_AUTH' :
//     state = {...state, isLoggedIn: true};
//     break;

//     case 'USER_UNAUTH' : 
//     state = {...state, isLoggedIn: false, user: {}, userID: ''};
//     break;

//     case 'TOGGLE_LOGIN' : 
//     state = {...state, isLoggedIn: action.isLoggedIn};
//     break;

//     case 'FETCHING_USER_INFO' :
//     state = {...state, isFetching: true};
//     break;

//     case 'UPDATE_USER' :
//     state = {...state, user: action.user};
//     break;

//     case 'UPDATE_FRIENDS' :
//     state = {...state, friends: action.friends};
//     break;

//     case 'UPDATE_ONLINE_FRIENDS' : 
//     state = {...state, onlineFriends: action.onlineFriends};
//     break;

//     case 'UPDATE_SUGGESTED_FRIENDS' : 
//     state = {...state, suggestedFriends: action.suggestedFriends};
//     break;

//     case 'UPDATE_SEARCH' : 
//     state = {...state, search: action.search};
//     break;


//     case 'UPDATE_EMOJIS' :
//     state = {...state, emojis: action.emojis};
//     break;

//     case 'UPDATE_STORE_EMOJIS' :
//     state = {...state, storeEmojis: action.storeEmojis};
//     break;

//     case 'UPDATE_USER_EMOJIS' :
//     state = {...state, userEmojis: action.userEmojis};
//     break;

//     case 'UPDATE_FRIEND_COUNT' : 
//     state = {...state, friendCount: action.count};
//     break;

//     case 'INCREASE_FRIEND_COUNT' : 
//     state = {...state, friendCount: state.friendCount++};
//     break;

//     case 'UPDATE_CHAT_LOG' : 
//     state = {...state, chatLog: action.chatLog};
//     break;

//     case 'UPDATE_CURRENT_CHAT' : 
//     state = {...state, currentChat: action.currentChat};
//     break;

//     case 'CREATE_ROOM' : 
//     state = {...state, room: action.room};
//     break;


//     case 'SEND_SOCKET' : 
//     state = {...state, socket: action.socket};
//     break;
//   }
//   console.log('checking state in reducer', state);
//   persist('client', JSON.stringify(state));
//   return state;
// };

