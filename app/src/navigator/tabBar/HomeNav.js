import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Customers from '../../../UI/components/customers';
import Team from '../../../UI/components/team';
import Home from '../../../UI/components/home';
import Reports from '../../../UI/components/reports';
import Praposals from '../../../UI/components/praposals';
import Quatations from '../../../UI/components/qutations';
import Task from '../../../UI/components/task';

const HomeNav = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Customers: {
      screen: Customers,
    },
    Team: {
      screen: Team,
    },
    Reports: {
      screen: Reports,
    },
    Praposals: {
      screen: Praposals,
    },
    Quatations: {
      screen: Quatations,
    },
    Task: {
      screen: Task,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
HomeNav.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Home') {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
    });
  }

  return {
    tabBarVisible,
  };
};
export default HomeNav;
