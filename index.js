/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './SRC/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './SRC/redux/store/store';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
