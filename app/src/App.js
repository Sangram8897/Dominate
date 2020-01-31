import React from 'react';
import {View, Text} from 'react-native';
import Auth from 'components/auth';
import store from 'store/configureStore';
import {Provider} from 'react-redux';
import AppNavigator from './MainNavigator';
import {enableScreens} from 'react-native-screens';
enableScreens();
const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <AppNavigator />
      </View>
    </Provider>
  );
};

export default App;
