import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '../dashboard';
import Customers from '../customers';
import Leads from '../leads';

const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    Dashboard: {
      //Title
      screen: Dashboard,
    },
    Customers: {
      //Title
      screen: Customers,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    Leads: {
      //Title
      screen: Leads,
      navigationOptions: {
        drawerLabel: 'l Screen 3',
      },
    },
  },
  {
  
    drawerWidth: 250,
    // drawerPosition: 'right',
  },
);

export default createAppContainer(DrawerNavigator);
