import React from 'react';
import App from './app-component';
import { shallow } from 'enzyme';
import 'isomorphic-fetch'
var fetchMock = require('fetch-mock');

test('App Deals Response', () => {
  var scope = fetchMock.get('*',
    { deals: [{ name: 'x' }] });
  const app = shallow(<App />);
  expect(app.state().deals.length).toBe(0);
});