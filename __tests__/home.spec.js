import Provider from '../node_modules/react-redux/src/components/Provider.js';
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

  // Verify that it's Off by default
  // Simulate a click and verify that it is now On
});