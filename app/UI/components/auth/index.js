/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Container from '../../reusables/Container';

import Fontstyle from '../../styles/Fontstyle';
import Strings from '../../styles/String';
import Size from '../../styles/Size';
import SignUp from './SignUp';
import Login from './Login';
import Color from '../../styles/Color';
import NoInternetBar from '../../reusables/NoInternetBar';
import {NavigationEvents} from 'react-navigation';
const Auth = props => {
  const [_switch, set_switch] = useState(true);
  const [_loading, set_loading] = useState(false);
  const [_datain, set_datain] = useState(false);

  setloading = (value = false) => {
    set_loading(value);
  };
  set_continue = () => {
    set_switch(true);
  };
  return (
    <ImageBackground
      source={require('images/authbackImage/background1.png')}
      style={{height: '100%', width: '100%', resizeMode: 'contain'}}>
      <NavigationEvents onWillFocus={() => set_continue()} />
      <Text
        style={[
          Fontstyle.FONT_SMALL,
          {color: 'white', marginVertical: Size.OF2, marginLeft: Size.OF2},
        ]}>
        {Strings.str_App_name}
      </Text>

      <Text
        style={[Fontstyle.FONT_XXLARGE, {color: 'white', textAlign: 'center'}]}>
        {Strings.str_auth_msg}
      </Text>
      <ScrollView style={{width: '95%', alignSelf: 'center'}}>
        <View
          style={{
            height: _switch ? Size.OF65 : Size.OF75,
            overflow: 'hidden',
            width: '95%',
            alignSelf: 'center',
            elevation: 10,
            borderRadius: 10,
            backgroundColor: Color.white,
            marginVertical: _switch ? Size.OF2 : Size.OF1,
          }}>
          <Container isLoading={_loading}>
            <View
              style={{
                height: Size.OF10,
                flexDirection: 'row',
                width: '100%',
              }}>
              <Headings
                value={_switch}
                label={Strings.str_sign_in}
                onPress={() => set_switch(true)}
              />
              <Headings
                value={!_switch}
                label={Strings.str_sign_up}
                onPress={() => set_switch(false)}
              />
            </View>
            {_switch ? (
              <Login setloading={setloading} navigation={props.navigation} />
            ) : (
              <SignUp setloading={setloading} navigation={props.navigation} />
            )}
          </Container>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const Headings = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        backgroundColor: props.value ? Color.white : Color.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={[
          Fontstyle.FONT_LARGE,
          {color: props.value ? Color.black : Color.white, marginTop: Size.OF1},
        ]}>
        {props.label}
      </Text>
      {props.value && (
        <View
          style={{
            height: '3%',
            width: '50%',
            borderRadius: 25,
            backgroundColor: Color.black,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

// const Auth = () => {
//   return (
//     <SafeAreaView style={{flex: 1, width: '90%'}}>
//       <Text
//         style={[Fontstyle.FONT_SMALL, {color: 'white', marginTop: Size.OF1}]}>
//         {Strings.str_App_name}
//       </Text>
//       <Text
//         style={[Fontstyle.FONT_XXLARGE, {color: 'white', marginTop: Size.OF5}]}>
//         {Strings.str_auth_msg}
//       </Text>
//       <View
//         style={{
//           height: Size.OF35 * 2,
//           marginTop: Size.OF2,
//           borderRadius: Size.OF2,
//           width: '100%',
//           backgroundColor: 'white',
//           overflow: 'hidden',
//         }}>
//         <Tabs
//           tabContainerStyle={{backgroundColor: 'red', height: 60}}
//           tabBarUnderlineStyle={{
//             width: '30%',
//             marginHorizontal: '6%',
//             backgroundColor: 'black',
//           }}>
//           <Tab
//             heading={Strings.str_sign_in}
//             textStyle={Fontstyle.FONT_MEDIUM}
//             tabStyle={{backgroundColor: 'white'}}
//             activeTextStyle={Fontstyle.FONT_LARGE}
//             activeTabStyle={{backgroundColor: 'white'}}>
//             <Login></Login>
//           </Tab>
//           <Tab
//             tabStyle={{backgroundColor: 'white'}}
//             textStyle={Fontstyle.FONT_MEDIUM}
//             heading={Strings.str_sign_up}
//             activeTextStyle={Fontstyle.FONT_LARGE}
//             activeTabStyle={{backgroundColor: 'white'}}>
//            <SignUp></SignUp>
//           </Tab>
//         </Tabs>
//       </View>
//     </SafeAreaView>
//   );
// };

export default Auth;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// class Tab1 extends Component {
//   render() {
//     return <View />;
//   }
// }

// class Tab2 extends Component {
//   render() {
//     return <View />;
//   }
// }
