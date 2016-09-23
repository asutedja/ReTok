
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

// ----- SET USER REDUCER INITIAL STATE ------ //
const userInitialState = {
  userID: '',
  user: {},
  isLoggedIn: false,
  error: '',
}

// ------------ USER REDUCER -----------------//
export default function userReducer (state = userInitialState, action) {
  switch(action.type){
   
   case 'USER_AUTH' :  
    return {
      ...state, 
      isLoggedIn: true,
    }

    case 'USER_UNAUTH' : 
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        userID: '',
      }

    case 'TOGGLE_LOGIN' : 
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      }

    case 'FETCHING_USER_INFO' : {
      return {
        ...state,
        isFetching: true,
      }
    }

    // case 'FETCHING_USER_INFO_ERROR' : {
    //   return {
    //     ...state,
    //     isFetching: false, 
    //     error: action.error, 
    //   }
    // }

    // case 'FETCHING_USER_SUCCESS' : {
    //   if (action.user === null) {
    //     return {
    //       ...state,
    //       user: action.user,
    //       isFetching: false, 
    //       error: '',
    //     }
    //   } else {
    //     if(action.userID = state.userID){
    //       return {
    //         ...state, 
    //         isFetching: false, 
    //         info: action.user,
    //       }
    //     }
    //   }
    // }

    case 'UPDATE_USER' : {
      return {
        ...state,
        user: action.user,
      }
    }

    default : 
      return state

    }
  }