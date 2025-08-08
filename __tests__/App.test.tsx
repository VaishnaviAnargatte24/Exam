/**
 * @format
 */
import React from 'react';
import { act, create } from 'react-test-renderer';
import App from '../App';

test('App renders correctly', async () => {
  let tree;

  await act(async () => {
    tree = create(<App />);
  });

  expect(tree).toBeDefined();
});
