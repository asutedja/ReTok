import ChatContainer from './Chat/ChatContainer.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = TestUtils.renderIntoDocument(
    <ChatContainer />
  );

  const checkboxNode = ReactDOM.findDOMNode(checkbox);

  // Verify that it's Off by default
  // Simulate a click and verify that it is now On
    TestUtils.findRenderedDOMComponentWithTag(checkbox, 'video')

  expect(checkboxNode.textContent).toEqual('On');
});