import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Routes from './Routes.js'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider }from 'react-redux'
import userReducer from './Redux/userReducer'
import uploadReducer from './Redux/uploadReducer'
import * as storage from 'redux-storage'

  const reducers = storage.reducer(combineReducers({
    userReducer,
    uploadReducer,
  }));

  import createEngine from 'redux-storage-engine-localstorage';
  const engine = createEngine('my-save-key');
  const middleware = storage.createMiddleware(engine);

  const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);


  const store = createStoreWithMiddleware(reducers);

  const load = storage.createLoader(engine);
  load(store);
   
  // Notice that our load function will return a promise that can also be used 
  // to respond to the restore event. 
  load(store)
      .then((newState) => console.log('Loaded state:', newState))
      .catch(() => console.log('Failed to load previous state'));
  

  render(

    <Provider store={store}>
      {Routes}
    </Provider>
    , document.getElementById('app')
  );