import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Gradientview from './app/UI/reusables/Gradientview';

class HomeScreen extends React.Component {
  render() {
    return (
    
        <Gradientview></Gradientview>
    
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default createAppContainer(AppNavigator);
