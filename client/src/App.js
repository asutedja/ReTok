import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Routes from './Routes.js'
import { createStore, combineReducers } from 'redux'
import { Provider }from 'react-redux'
import userReducer from './Redux/userReducer'
import uploadReducer from './Redux/uploadReducer'


  const reducers = combineReducers({
    userReducer,
    uploadReducer,
  })


  const store = createStore(reducers);

  render(

    <Provider store={store}>
      {Routes}
    </Provider>
    , document.getElementById('app')
  );