import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Routes from './Routes.js'



  render(
    Routes, document.getElementById('app')
  );



// import { createStore, combineReducers } from 'redux'
// import { Provider } from 'react-redux'


// const reducers = combineReducers({
// })


// const store = createStore(reducers);
