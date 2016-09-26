import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Routes from './Routes.js'
<<<<<<< 62a018f62947cbe143f870a50993a108b9b6acdc
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import userReducer from './Redux/userReducer'

=======
// import {tester} from 'graphql-tester';
>>>>>>> Working on passport local auth


  // render(
  //   Routes, document.getElementById('app')
  // );


  const reducers = combineReducers({
    userReducer
  })

  // Create store that houses state-tree of app
  // Can be modified by dispatching actions on above reducers
  // (see 'redux/' for actions)
  const store = createStore(reducers);

  render(
    // Provider will make the Redux-Store (state tree) accessible to ALL components. 
    //(React specific helper module for simplifying redux!)
    <Provider store={store}>
      {Routes}
    </Provider>
    , document.getElementById('app')
  );