/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useDimensions from 'hooks/useDimensions';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Input from '../../../reusables/Input';
import {ErrorMessage} from 'reusables/ErrorMessage';

import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Color from '../../../styles/Color';
import Button from '../../../reusables/Button';
import Fontstyle from '../../../styles/Fontstyle';
import {useNetInfo} from '@react-native-community/netinfo';
import {setLogin} from './functions/login_main';
import {loginFields_Validation} from './functions/validator';
import Actions from 'actions';

const Login = props => {
  const {width, height} = useDimensions().window;
  const [_logindata, set_logindata] = useState({
    _workspace: 'domain105',
    _email: 'sangrampaste9788@gmail.com',
    _password: '123456',
  });

  const [_workspace_error, set_workspace_error] = useState(true);
  const [_email_error, set_email_error] = useState(true);

  const _emailref = useRef(null);
  const _passwordref = useRef(null);
  const dispatch = useDispatch();

  const netInfo = useNetInfo();

  login = async () => {
    props.setloading(true);
    const valid_data = await loginFields_Validation(
      _logindata,
      netInfo.isConnected,
    );
    const result_data = await setLogin(valid_data);
    if (result_data.exp) {
      dispatch(Actions.LOGIN(result_data));
      console.warn();
    }
    props.setloading(false);
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
          onSubmitEditing={() => _emailref.current.focus()}
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
          onSubmitEditing={() => _passwordref.current.focus()}
        />
        {/* <View style={styles.errorContainer}>
          {_email_error &&
            renderError(Strings.str_valid_email, 'username_error')}
        </View> */}
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
      <View
        style={{
          height: Size.OF8,
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            Fontstyle.FONT_SMALL,
            {
              color: Color.primary,
            },
          ]}>
          {Strings.str_forgot_password}
        </Text>
      </View>
      <View
        style={{
          height: Size.OF10,
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
