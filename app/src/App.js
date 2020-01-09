import React from 'react';
import {View, Text} from 'react-native';
import Auth from 'components/auth';
import store from 'store/configureStore';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Auth />
      </View>
    </Provider>
  );
};

export default App;
