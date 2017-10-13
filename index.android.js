/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/stores/store';
import Skeleton from './src/Skeleton';

const store = configureStore()

export default class demo3 extends Component {
  render() {
  	console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Skeleton />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('demo3', () => demo3);

