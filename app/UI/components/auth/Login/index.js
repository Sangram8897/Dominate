/* eslint-disable no-undef */
// import React, {useState, useCallback, useEffect} from 'react';
// import {View, Text} from 'react-native';
// import Input from '../../reusables/Input';

// import Size from '../../styles/Size';
// import Strings from '../../styles/String';
// import Color from '../../styles/Color';
// import Button from '../../reusables/Button';
// import Fontstyle from '../../styles/Fontstyle';

// const Login = () => {
//   const [_workspace, set_workspace] = useState('');
//   const [_eamail, set_eamail] = useState('');
//   const [_password, set_password] = useState('');

//   login = async () => {};

//   return (
//     <View style={{flex: 1}}>
//       <Input
//         label={'Workspace'}
//         value={_workspace}
//         onChangeText={text => set_workspace(text)}
//         maxLength={10}
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
//       <Input
//         label={'Email'}
//         value={_eamail}
//         onChangeText={text => set_eamail(text)}
//         maxLength={10}
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
//       <Input
//         label={'Password'}
//         value={_password}
//         onChangeText={text => set_password(text)}
//         maxLength={10}
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
//       <View
//         style={{
//           height: Size.OF8,
//           width: '90%',
//           alignSelf: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text
//           style={[
//             Fontstyle.FONT_SMALL,
//             {
//               color: Color.primary,
//             },
//           ]}>
//           {Strings.str_forgot_password}
//         </Text>
//       </View>
//       <View
//         style={{
//           height: Size.OF10,
//           width: '50%',
//           alignSelf: 'center',
//           justifyContent: 'center',
//         }}>
//         <Button
//           onPressedFunction={() => {}}
//           backColor={Color.primary2}
//           borderColor={Color.primary2}
//           label={Strings.str_sign_in}
//           textColor={Color.white}
//         />
//       </View>
//     </View>
//   );
// };

// export default Login;

//akshaynagargoje0716@gmail.com
//123456
//domain100

// import React, {useState, useCallback, useEffect,useRef} from 'react';
// import {useNetInfo} from '@react-native-community/netinfo';
// import {useSelector, useDispatch} from 'react-redux';

// import {View, Text} from 'react-native';
// import Input from '../../../reusables/Input';

// import Size from '../../../styles/Size';
// import Strings from '../../../styles/String';
// import Color from '../../../styles/Color';
// import Button from '../../../reusables/Button';
// import Fontstyle from '../../../styles/Fontstyle';

// import Actions from 'actions';

// import {loginFields_Validation} from './functions/validator';
// import {SnackMessage, NONetworkAlert} from '../../../../functions/message';

// const Login = () => {
//   const dispatch = useDispatch();
//   const netInfo = useNetInfo();

//   const [_logindata, set_logindata] = useState({
//     _workspace: 'domain100',
//     _email: 'akshaynagargoje0716@gmail.com',
//     _password: '123456',
//   });
//   const emailref = useRef(null);
//   const passwordref = useRef(null);

//   login = async () => {
//     try {
//       if (!netInfo.isConnected) {
//         return NONetworkAlert();
//       }
//       dispatch(
//         Actions.LOGIN(
//           loginFields_Validation(_logindata),
//           onLogin_SUCCESS,
//           onLogin_FAIL,
//         ),
//       );
//     } catch (err) {
//       SnackMessage(err.message);
//     }
//   };
//   onLogin_SUCCESS = () => {
//     setTimeout(() => {
//       console.warn('hellow');
//     }, 2000);
//   };

//   onLogin_FAIL = () => {
//     console.warn('Fail');
//   };
//   return (
//     <View style={{flex: 1}}>
//       <Input
//         label={'Workspace'}
//         value={_logindata._workspace}
//         onChangeText={text => set_logindata({..._logindata, _workspace: text})}
//         maxLength={10}
//         autoCorrect={false}
//         returnKeyType="next"
//          onSubmitEditing={() => emailref.current.focus()}
//       />
//       <Input
//       ref={emailref}
//         label={'Email'}
//         value={_logindata._email}
//         onChangeText={text => set_logindata({..._logindata, _email: text})}
//         maxLength={10}
//         autoCorrect={false}
//       />
//       <Input
//         label={'Password'}
//         value={_logindata._password}
//         onChangeText={text => set_logindata({..._logindata, _password: text})}
//         maxLength={10}
//         secureTextEntry={true}
//         autoCorrect={false}
//       />
//       <View
//         style={{
//           height: Size.OF8,
//           width: '90%',
//           alignSelf: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text
//           style={[
//             Fontstyle.FONT_SMALL,
//             {
//               color: Color.primary,
//             },
//           ]}>
//           {Strings.str_forgot_password}
//         </Text>
//       </View>
//       <View
//         style={{
//           height: Size.OF10,
//           width: '50%',
//           alignSelf: 'center',
//           justifyContent: 'center',
//         }}>
//         <Button
//           onPressedFunction={() => {
//             login();
//           }}
//           backColor={Color.primary2}
//           borderColor={Color.primary2}
//           label={Strings.str_sign_in}
//           textColor={Color.white}
//         />
//       </View>
//     </View>
//   );
// };

// export default Login;

import React, {useState, useCallback, useEffect, useRef} from 'react';

import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import useDimensions from 'hooks/useDimensions';
import Color from '../../../styles/Color';
import Fontstyle from '../../../styles/Fontstyle';
import Button from '../../../reusables/Button';
import Strings from '../../../styles/String';
import {ErrorMessage} from 'reusables/ErrorMessage';

import Actions from 'actions';

import {loginFields_Validation} from './functions/validator';
import {SnackMessage, NONetworkAlert} from '../../../../functions/message';
import Size from '../../../styles/Size';

import {isworkspace_exist, email_validate} from './functions/Checkworkspace';
const Login = () => {
  const {width, height} = useDimensions().window;
  const [_logindata, set_logindata] = useState({
    _workspace: 'domain105',
    _email: 'sangrampaste9788@gmail.com',
    _password: '123456',
  });
  const [_workspace_error, set_workspace_error] = useState(false);
  const [_email_error, set_email_error] = useState(false);

  const _emailref = useRef(null);
  const _passwordref = useRef(null);
  const dispatch = useDispatch();

  const netInfo = useNetInfo();

  const user = useSelector(state => state.AuthData.user);

  useEffect(() => {
    if (user) {
      set_logindata({
        _workspace: user.workspaceId,
        _email: user.email,
        _password: '',
      });
    }
  }, [user]);

  login = async () => {
    try {
      if (!netInfo.isConnected) {
        return NONetworkAlert();
      }
      dispatch(
        Actions.LOGIN(
          loginFields_Validation(_logindata),
          onLogin_SUCCESS,
          onLogin_FAIL,
        ),
      );
    } catch (err) {
      SnackMessage(err.message);
    }
  };
  onLogin_SUCCESS = () => {
    setTimeout(() => {
      console.warn('hellow');
    }, 2000);
  };

  onLogin_FAIL = () => {
    console.warn('Fail');
  };
  renderError = (errorMsg, errID) => {
    return <ErrorMessage errorMessage={errorMsg} errorID={errID} />;
  };
  return (
    <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
      <View
        style={{
          height: Size.OF12,
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text style={Fontstyle.FONT_SMALL}>Workspace</Text>
        <TextInput
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="next"
          autoCorrect={false}
          value={_logindata._workspace}
          onChangeText={text =>
            set_logindata({..._logindata, _workspace: text})
          }
          onSubmitEditing={async () => {
            const state = await isworkspace_exist(_logindata._workspace);
            if (!state) {
              set_workspace_error(true);
            } else {
              set_workspace_error(false);
              _emailref.current.focus();
            }
          }}
        />
        <View style={styles.errorContainer}>
          {_workspace_error &&
            renderError(Strings.str_workspace_not_exist, 'username_error')}
        </View>
      </View>
      <View
        style={{
          height: Size.OF12,
          width: '100%',
          justifyContent: 'space-evenly',
        }}>
        <Text style={Fontstyle.FONT_SMALL}>Email</Text>
        <TextInput
          ref={_emailref}
          placeholderTextColor={Color.gray}
          autoCorrect={false}
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="next"
          keyboardType={'email-address'}
          autoCompleleType={'email'}
          blurOnSubmit={true}
          value={_logindata._email}
          onChangeText={text => set_logindata({..._logindata, _email: text})}
          onSubmitEditing={
            async () => {
              const state1 = await email_validate(_logindata._email);
              set_email_error(state1);
            }
            // _passwordref.current.focus()
          }
        />
        <View style={styles.errorContainer}>
          {_email_error &&
            renderError(Strings.str_valid_email, 'username_error')}
        </View>
      </View>
      <View
        style={{
          height: Size.OF12,
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text style={Fontstyle.FONT_SMALL}>Password</Text>
        <TextInput
          ref={_passwordref}
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="done"
          autoCorrect={false}
          value={_logindata._password}
          secureTextEntry={true}
          onChangeText={text => set_logindata({..._logindata, _password: text})}
        />
      </View>
      <Text
        style={[
          Fontstyle.FONT_SMALL,
          {
            color: Color.primary,
            marginVertical: Size.OF1,
          },
        ]}>
        {Strings.str_forgot_password}
      </Text>
      <View
        style={{
          flex: 1,
          width: '50%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPressedFunction={() => {
            login();
          }}
          backColor={Color.primary2}
          borderColor={Color.primary2}
          label={Strings.str_sign_in}
          textColor={Color.white}
        />
      </View>
    </View>
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
export default Login;
