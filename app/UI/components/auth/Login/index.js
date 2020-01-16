/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useDimensions from 'hooks/useDimensions';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '../../../reusables/Input';
import {ErrorMessage} from 'reusables/ErrorMessage';

import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Color from '../../../styles/Color';
import Button from '../../../reusables/Button';
import Fontstyle from '../../../styles/Fontstyle';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  loginFields_Validation,
  isworkspace_exist,
} from '../functions/validator';
import Actions from 'actions';
import {errorHandler} from '../../../../functions/message';
import {ScrollView} from 'react-native-gesture-handler';

const Login = props => {
  const {width, height} = useDimensions().window;
  const [_logindata, set_logindata] = useState({
    _workspace: '',
    _email: '',
    _password: '',
  });

  const [_workspace_error, set_workspace_error] = useState(false);
  const _workspaceref = useRef(null);
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
      _passwordref.current.focus();
    }
  }, [user]);

  login = async () => {
    props.setloading(true);
    try {
      // const valid_data = await loginFields_Validation(
      //   _logindata,
      //   netInfo.isConnected,
      // );
      // await dispatch(Actions.AUTHENTICATE(valid_data));
      // props.setloading(false);
      props.navigation.navigate('DrawerNavigator');
    } catch (err) {
      errorHandler(err);
      props.setloading(false);
    }
  };

  renderError = (errorMsg, errID) => {
    return <ErrorMessage errorMessage={errorMsg} errorID={errID} />;
  };
  checkWorkspace = async () => {
    try {
      props.setloading(true);
      const isExist = await isworkspace_exist(_logindata._workspace);
      if (isExist) {
        set_workspace_error(false);
        _emailref.current.focus();
      } else {
        set_workspace_error(true);
        _workspaceref.current.focus();
      }
      props.setloading(false);
    } catch (err) {
      console.warn(err);
      props.setloading(false);
    }
  };

  return (
    <View
      style={{flex: 1, width: '100%', alignSelf: 'center', overflow: 'hidden'}}>
      <View
        style={{
          height: Size.OF12,
          width: '100%',
          justifyContent: 'center',
          marginTop: Size.OF2,
        }}>
        <Text style={Fontstyle.FONT_SMALL}>Workspace</Text>
        <TextInput
          ref={_workspaceref}
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="next"
          autoCorrect={false}
          placeholder={Strings.str_sign_up_place_Workspace}
          value={_logindata._workspace}
          onChangeText={text =>
            set_logindata({..._logindata, _workspace: text})
          }
          onSubmitEditing={() => checkWorkspace()}
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
          marginTop: Size.OF1,
          justifyContent: 'center',
        }}>
        <Text style={Fontstyle.FONT_SMALL}>Email</Text>
        <TextInput
          ref={_emailref}
          placeholderTextColor={Color.gray}
          autoCorrect={false}
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="next"
          placeholder={Strings.str_sign_up_place_email}
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
          placeholder={Strings.str_sign_up_place_password}
          autoCorrect={false}
          value={_logindata._password}
          secureTextEntry={true}
          onChangeText={text => set_logindata({..._logindata, _password: text})}
        />
      </View>
      <View
        style={{
          height: Size.OF7,
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
