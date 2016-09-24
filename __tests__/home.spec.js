import HomeContainer from '../client/src/Home/HomeContainer.js';
import ProfileContainer from '../client/src/Profile/ProfileContainer.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = TestUtils.renderIntoDocument(
    <HomeContainer />
  );

  const checkboxNode = ReactDOM.findDOMNode(checkbox);

  const profile = TestUtils.renderIntoDocument(<ProfileContainer/>);

  const profileNode = ReactDOM.findDOMNode(profile);  
  // Verify that it's Off by default
  // Simulate a click and verify that it is now On
  expect(profileNode).to.equal(checkboxNode);
});