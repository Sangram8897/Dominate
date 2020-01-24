import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Auth from 'components/auth';
import Welcome from 'components/auth/Welcome';
import Login from 'components/auth/Login';
import SignUp from 'components/auth/SignUp';
import TabNav from './navigator/tabBar/TabBarNavigator';
const AuthNav = createStackNavigator(
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
);

export default createAppContainer(
  createSwitchNavigator({
    AuthNav,
    TabNav,
  }),
);
