import React from 'react';
import {Image, View, Dimensions, TouchableOpacity} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Dashboard from '../../../UI/components/dashboard';
import Color from '../../../UI/styles/Color';

import Leads from '../../../UI/components/leads';
import Praposals from '../../../UI/components/praposals';
import Reports from '../../../UI/components/reports';
import Task from '../../../UI/components/task';
import Profile from '../../../UI/components/profile';
import Quatations from '../../../UI/components/qutations';
import Home from '../../../UI/components/home';
import Chat from '../../../UI/components/chat';
import HomeNav from './HomeNav';
import LeadsNav from './LeadsNav';
export const iconSize = 25;
const dimen = Dimensions.get('window');

const routeConfiguration = {
  TabOne: {
    path: '/',
    screen: HomeNav,

    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image
            resizeMode="contain"
            source={require('icons/dashboard/home.png')}
            style={{
              width: iconSize,
              height: iconSize,
              tintColor: focused ? Color.primary : 'grey',
            }}
          />
        </View>
      ),
    },
  },
  TabTwo: {
    path: '/',
    screen: LeadsNav,

    navigationOptions: {
      title: 'Leads',
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image
            resizeMode="contain"
            source={require('icons/dashboard/filter.png')}
            style={{
              width: iconSize,
              height: iconSize,
              tintColor: focused ? Color.primary : 'grey',
            }}
          />
        </View>
      ),
    },
  },
  TabThree: {
    path: '/',
    screen: Chat,

    navigationOptions: {
      title: 'Chat',
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image
            resizeMode="contain"
            source={require('icons/dashboard/chat.png')}
            style={{
              width: iconSize,
              height: iconSize,
              tintColor: focused ? Color.primary : 'grey',
            }}
          />
        </View>
      ),
    },
  },
  TabFour: {
    path: '/',
    screen: Profile,

    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image
            resizeMode="contain"
            source={require('icons/dashboard/profile.png')}
            style={{
              width: iconSize,
              height: iconSize,
              tintColor: focused ? Color.primary : 'grey',
            }}
          />
        </View>
      ),
    },
  },
};
const tabBarConfiguration = {
  initialRouteName: 'TabOne',
  tabBarPosition: 'bottom',
  lazy: true,
  pressColor: Color.black,
  //resetOnBlur: true,

  tabBarOptions: {
    showLabel: false,
    activeTintColor: Color.primary,
    inactiveTintColor: 'grey',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#FFF',
      borderTopWidth: 0.5,
      marginBottom: 0,
      shadowOpacity: 5,
    },
  },
};

const TabNav = createBottomTabNavigator(
  routeConfiguration,
  tabBarConfiguration,
);
export default TabNav;
