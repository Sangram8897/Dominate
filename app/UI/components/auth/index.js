import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Container from 'reusables/Container';

import Fontstyle from '../../styles/Fontstyle';
import Strings from '../../styles/String';
import Size from '../../styles/Size';
import SignUp from './SignUp';
import Login from './Login';
import Color from '../../styles/Color';
import NoInternetBar from '../../reusables/NoInternetBar';
const Auth = props => {
  const [_switch, set_switch] = useState(true);
  const [_loading, set_loading] = useState(false);
  setloading = (value = false) => {
    set_loading(value);
  };
  return (
    <ImageBackground
      source={require('images/authbackImage/background1.png')}
      style={{height: '100%', width: '100%', resizeMode: 'contain'}}>
      <Container isLoading={false}>
        <View style={{flex: 1, width: '100%'}}>
          <Text
            style={[
              Fontstyle.FONT_SMALL,
              {color: 'white', marginVertical: Size.OF2, marginLeft: Size.OF2},
            ]}>
            {Strings.str_App_name}
          </Text>

          <Text
            style={[
              Fontstyle.FONT_XXLARGE,
              {
                color: 'white',
                marginLeft: Size.OF2,
                marginVertical: _switch ? Size.OF4 : Size.OF1,
              },
            ]}>
            {Strings.str_auth_msg}
          </Text>

          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ScrollView style={{width: '100%'}}>
              <View
                style={{
                  height: _switch ? Size.OF65 : Size.OF75,
                  marginVertical: 10,
                  overflow: 'hidden',
                  width: '90%',
                  backgroundColor: Color.white,
                  elevation: 5,
                  borderRadius: 15,
                  alignSelf: 'center',
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
                    <Login setloading={setloading} />
                  ) : (
                    <SignUp setloading={setloading} />
                  )}
                </Container>
              </View>
            </ScrollView>
          </View>
        </View>
      </Container>
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

export default Auth;

/**
 *  <ScrollView style={{ height: _switch?Size.OF75:Size.OF75,elevation:10,width:'95%',alignSelf:'center'}}>
          <View
            style={{
              height: _switch?Size.OF65:Size.OF75,
              overflow: 'hidden',
              width: '95%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: Color.white,
              marginVertical: _switch? Size.OF2:Size.OF1,
            }}>
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
            {_switch ? <Login /> : <SignUp />}
          </View>
        </ScrollView>
 */
