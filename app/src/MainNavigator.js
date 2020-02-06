import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';
import React from 'react';

import Auth from 'components/auth';


import SignUp from '../UI/components/auth/signup';
import TabNav from './tabBar/TabBarNavigator';
import SignIn from '../UI/components/auth/signin';
import Welcome from '../UI/components/auth/Welcome';
const AuthNav = createSwitchNavigator(
  {
    Auth: {
      screen: Auth,
    },
    Welcome: {
      screen: Welcome,
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator({
    AuthNav,
    TabNav,
  }),
);
