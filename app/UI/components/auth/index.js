/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// import React, {useState, useCallback, useEffect} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   ImageBackground,
//   TouchableOpacity,
//   KeyboardAvoidingView
// } from 'react-native';
// import Container from 'reusables/Container';

// import Fontstyle from '../../styles/Fontstyle';
// import Strings from '../../styles/String';
// import Size from '../../styles/Size';
// import SignUp from './SignUp';
// import Login from './Login';
// import Color from '../../styles/Color';
// import NoInternetBar from '../../reusables/NoInternetBar';
// import {NavigationEvents} from 'react-navigation';

// const Auth = props => {
//   const [_switch, set_switch] = useState(true);
//   const [_loading, set_loading] = useState(false);
//   setloading = (value = false) => {
//     set_loading(value);
//   };
//   set_continue = () => {
//     set_switch(true);
//   };
//   return (
//     <ImageBackground
//       source={require('images/authbackImage/background1.png')}
//       style={{height: '100%', width: '100%', resizeMode: 'contain'}}>
//       <NavigationEvents onWillFocus={() => set_continue()} />
//         <View style={{flex: 1, width: '100%'}}>
//           <Text
//             style={[
//               Fontstyle.FONT_SMALL,
//               {color: 'white', marginVertical: Size.OF2, marginLeft: Size.OF2},
//             ]}>
//             {Strings.str_App_name}
//           </Text>
//           <View
//             style={{
//               width: '100%',
//               alignSelf: 'center',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <ScrollView style={{width: '100%'}}>

//           <Text
//             style={[
//               Fontstyle.FONT_XXLARGE,
//               {
//                 color: 'white',
//                 marginLeft: Size.OF2,
//                 marginVertical: _switch ? Size.OF4 : Size.OF1,
//               },
//             ]}>
//             {Strings.str_auth_msg}
//           </Text>

//               <View
//                 style={{
//                   height: _switch ? Size.OF65 : Size.OF78,
//                   marginVertical: 10,
//                   overflow: 'hidden',
//                   width: '90%',
//                   backgroundColor: Color.white,
//                   elevation: 5,
//                   borderRadius: 15,
//                   alignSelf: 'center',
//                 }}>

//                 <Container isLoading={_loading}>
//                   <View
//                     style={{
//                       height: Size.OF10,
//                       flexDirection: 'row',
//                       width: '100%',
//                       overflow:'hidden'
//                     }}>
//                     <Headings
//                       value={_switch}
//                       label={Strings.str_sign_in}
//                       onPress={() => set_switch(true)}
//                     />
//                     <Headings
//                       value={!_switch}
//                       label={Strings.str_sign_up}
//                       onPress={() => set_switch(false)}
//                     />
//                   </View>
//                   {_switch ? (
//                     <Login setloading={setloading} navigation={props.navigation}/>
//                   ) : (
//                     <SignUp setloading={setloading} navigation={props.navigation}/>
//                   )}
//                 </Container>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//     </ImageBackground>
//   );
// };

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

// export default Auth;

import React, {useState, useCallback, useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Container from 'reusables/Container';

import Size from '../../styles/Size';
import Color from '../../styles/Color';
import Fontstyle from '../../styles/Fontstyle';
import Strings from '../../styles/String';
import Login from './Login';
import SignUp from './SignUp';
import {NavigationEvents} from 'react-navigation';

const Auth = props => {
  const [_switch, set_switch] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [_loading, set_loading] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isKeyboardVisible]);

  setloading = (value = false) => {
    set_loading(value);
  };
  set_continue = () => {
    set_switch(true);
  };

  return (
    <SafeAreaView>
    <ImageBackground
      source={require('images/authbackImage/background1.png')}
      style={{height: '100%', width: '100%', resizeMode: 'contain'}}>
      <View
        style={{
          flex: 1,
        }}>
           <NavigationEvents onWillFocus={() => set_continue()} />
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
        <Text
          style={[
            Fontstyle.FONT_XLARGE,
            {
              color: 'white',
              marginLeft: Size.OF2,
              marginTop: Size.OF2,
            },
          ]}>
          {Strings.str_auth_msg}
        </Text>
        <View
          style={{
            flex: 1,
            width: '90%',
            elevation: 5,
            marginVertical:isKeyboardVisible ? 0:(_switch? Size.OF5:Size.OF1),
            borderRadius: 10,
            backgroundColor: Color.white,
            alignSelf: 'center',
          }}>
          <Container isLoading={_loading}>
            <View
              style={{
                height: Size.OF10,
                flexDirection: 'row',
                width: '100%',
                overflow: 'hidden',
                borderRadius: 10,
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
                    <Login setloading={setloading} navigation={props.navigation}/>
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
});
export default Auth;
