import HomeContainer from '../client/src/Home/HomeContainer.js';
import ProfileContainer from '../client/src/Profile/ProfileContainer.js';
import StoreContainer from '../client/src/Store/StoreContainer.js'
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import userReducer from '../client/src/Redux/userReducer.js'
//import App from '../client/src/App.js'
import Profile from '../client/src/Profile/Profile.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'


//profile to store

it('Check if webRTC grabs local info or not', () => {
  // Render a checkbox with label in the document
  // const middlewares = [ thunk ]
  // const mockStore = configureMockStore(middlewares)

  // const store = mockStore(userReducer())


  const checkbox = TestUtils.renderIntoDocument(
    <HomeContainer />
  );

  

  const checkboxNode = ReactDOM.findDOMNode(checkbox);

  expect(!!checkboxNode).toBe(true);



  // Verify that it's Off by default
  // Simulate a click and verify that it is now On
});