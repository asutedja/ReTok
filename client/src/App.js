import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Routes from './Routes.js'
import { createStore, combineReducers } from 'redux'
import { Provider }from 'react-redux'
import userReducer from './Redux/userReducer'
import uploadReducer from './Redux/uploadReducer'
<<<<<<< 1d3561be50cd4c1bd83ad5a0716a997f3cbd6ed9

  const reducers = storage.reducer(combineReducers({
    userReducer,
    uploadReducer,
  }));
=======
// import {tester} from 'graphql-tester';

  // render(
  //   Routes, document.getElementById('app')
  // );


  const reducers = combineReducers({
    userReducer,
    uploadReducer,
  })

>>>>>>> Persists state of refresh
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