import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';
import React, { Component } from 'react';

import Auth from 'components/auth';
import Welcome from 'components/auth/Welcome';
import Login from 'components/auth/Login';
import SignUp from 'components/auth/SignUp';
import TabNav from './navigator/tabBar/TabBarNavigator';
const AuthNav = createAnimatedSwitchNavigator(
  {
    Auth: {
      screen: Auth,
    },
    Welcome: {
      screen: Welcome,
    },
    Login: {
      screen: Login,
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
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.In
          type='slide-right'
          durationMs={2000}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={2000} />
      </Transition.Together>
    ),
  },
);

export default createAppContainer(
  createSwitchNavigator({
    AuthNav,
    TabNav,
  }),
);
