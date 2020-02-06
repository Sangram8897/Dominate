/* eslint-disable no-undef */
const Headings = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        backgroundColor: props.value ? Color.white : Color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
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

import React, {useState, useCallback, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Keyboard,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Size from '../../styles/Size';
import Color from '../../styles/Color';
import Fontstyle from '../../styles/Fontstyle';
import Strings from '../../styles/String';
import SignIn from './signin';
import SignUp from './signup';
import {NavigationEvents} from 'react-navigation';
import Container from '../../reusables/Container';
import NoInternetBar from 'reusables/NoInternetBar';

const Auth = props => {

  const netInfo = useNetInfo();

  const [_switch, set_switch] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [_loading, set_loading] = useState(false);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardVisible(true); // or some other action
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardVisible(false); // or some other action
  //     },
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, [isKeyboardVisible]);
  setloading = (value = false) => {
    set_loading(value);
  };
  set_continue = () => {
    set_switch(true);
  };
  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <ImageBackground
        source={require('images/authbackImage/background1.png')}
        style={{height: '100%', width: '100%', resizeMode: 'contain'}}>
        <View
          style={{
            flex: 1,
          }}>
          <Image
            source={require('../../../assets/icons/app-icon/app2.png')}
            style={{
              height: Size.OF6,
              width: Size.OF20,
              resizeMode: 'contain',
              marginTop: Size.OF2,
              marginLeft: Size.OF2,
            }}
          />
           {!netInfo.isConnected && <NoInternetBar />}
          <Text
            style={[
              Fontstyle.FONT_XLARGE,
              {
                color: 'white',
                marginLeft: Size.OF2,
                marginTop: Size.OF1 ,
              },
            ]}>
            {Strings.str_auth_msg}
          </Text>
          <View
            style={[
              styles.shadowColor,
              {
                flex: 1,
                width: '90%',
                marginVertical: isKeyboardVisible
                  ? 0
                  : _switch
                  ? Size.OF5
                  : Size.OF1,
                borderRadius: 20,
                backgroundColor: Color.white,
                alignSelf: 'center',
                zIndex: 1,
              },
            ]}>
            <Container isLoading={_loading}>
              <View
                style={{
                  height: Size.OF10,
                  flexDirection: 'row',
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: 20,
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
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: '90%', flex: 1, alignSelf: 'center'}}>
                  <ScrollView>
                    {_switch ? (
                      <SignIn setloading={setloading} navigation={props.navigation}/>
                    ) : (
                      <SignUp setloading={setloading} navigation={props.navigation}/>
                    )}
                  </ScrollView>
                </View>
              </View>
            </Container>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    color: Color.gray,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Color.light_gray,
  },
  shadowColor:
    Platform.OS === 'ios'
      ? {
          shadowColor: Color.gray,
          shadowOpacity: 1,
          shadowRadius: 5,
        }
      : {
          elevation: 5,
        },
});
export default Auth;
