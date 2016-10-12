import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Routes from './Routes.js'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider }from 'react-redux'
import userReducer from './Redux/userReducer'
import uploadReducer from './Redux/uploadReducer'

  const reducers = combineReducers({
    userReducer,
    uploadReducer,
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