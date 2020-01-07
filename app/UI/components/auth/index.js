import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Container, Header, Content, Tab, Tabs} from 'native-base';

import Fontstyle from '../../styles/Fontstyle';
import Strings from '../../styles/String';
import Size from '../../styles/Size';

const Auth = () => {
  return (
    <SafeAreaView style={{flex: 1, width: '90%'}}>
      <Text
        style={[Fontstyle.FONT_SMALL, {color: 'white', marginTop: Size.OF1}]}>
        {Strings.str_App_name}
      </Text>
      <Text
        style={[Fontstyle.FONT_XXLARGE, {color: 'white', marginTop: Size.OF5}]}>
        {Strings.str_auth_msg}
      </Text>
      <View
        style={{
          height: Size.OF35 * 2,
          marginTop: Size.OF2,
          borderRadius: Size.OF2,
          width: '100%',
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <Tabs
          tabContainerStyle={{backgroundColor: 'red', height: 60}}
          tabBarUnderlineStyle={{
            width: '30%',
            marginHorizontal: '6%',
          }}>
          <Tab
            heading={Strings.str_sign_in}
            tabStyle={{backgroundColor: 'white'}}
            activeTextStyle={Fontstyle.FONT_LARGE}>
            <Tab1 />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: 'white'}}
            heading={Strings.str_sign_up}
            activeTextStyle={Fontstyle.FONT_LARGE}>
            <Tab2 />
          </Tab>
        </Tabs>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Tab1 extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

class Tab2 extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

class Tab3 extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

class Tab4 extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
