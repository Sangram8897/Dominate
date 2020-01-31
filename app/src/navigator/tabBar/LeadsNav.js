import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Leads from '../../../UI/components/leads';

import ViewLead from '../../../UI/components/leads/viewLead';
import AddLead from '../../../UI/components/leads/AddLead';
import AddLead2 from '../../../UI/components/leads/AddLead/AddLead2';
import LeadAnimator from '../../../UI/components/leads/AddLead/LeadAnimator';

const LeadsNav = createStackNavigator(
  {
    Leads: {
      screen: Leads,
    },
    LeadAnimator: {
      screen: LeadAnimator,
    },
    AddLead: {
      screen: AddLead,
    },
    AddLead2: {
      screen: AddLead2,
    },
    ViewLead: {
      screen: ViewLead,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
LeadsNav.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Leads') {
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
export default LeadsNav;
