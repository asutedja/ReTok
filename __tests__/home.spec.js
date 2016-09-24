import HomeContainer from '../client/src/Home/HomeContainer.js';
import ProfileContainer from '../client/src/Profile/ProfileContainer.js';
import StoreContainer from '../client/src/Store/StoreContainer.js'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = TestUtils.renderIntoDocument(
    <Provider />
  );

  const checkboxNode = ReactDOM.findDOMNode(checkbox);

  expect(!!checkboxNode).toBe(true);
});