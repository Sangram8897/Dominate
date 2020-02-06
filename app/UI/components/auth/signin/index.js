/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import Actions from 'action';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Fontstyle from 'styles/Fontstyle';
import Input from 'reusables/Input';
import Strings from 'styles/String';
import Size from 'styles/Size';
import Color from 'styles/Color';
import Button from 'reusables/Button';
import {ErrorMessage} from 'reusables/ErrorMessage';
import {
  loginFields_Validation,
  isworkspace_exist,
} from '../functions/validator';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import validate from 'utils/validation';

const SignIn = props => {
  const [_logindata, set_logindata] = useState({
    _workspace: 'domain222',
    _email: 'sangrampaste9788@gmail.com',
    _password: '123456',
  });
  const [inputs, set_inputs] = useState({});
  const dispatch = useDispatch();
  const [_workspace_error, set_workspace_error] = useState(false);
  const netInfo = useNetInfo();

  const user = useSelector(state => state.AuthData.user);

  // useEffect(() => {
  //   if (user) {
  //     set_logindata({
  //       _workspace: user.workspaceId,
  //       _email: user.email,
  //       _password: '',
  //     });
  //     focusNextField('_password');
  //   }
  // }, [user]);

  focusNextField = id => {
    inputs[id].focus();
  };

  setRef = (id, input) => {
    inputs[id] = input;
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
        focusNextField('_email');
      } else {
        set_workspace_error(true);
        focusNextField('_workspace');
      }
      props.setloading(false);
    } catch (err) {
      props.setloading(false);
    }
  };

  login = async () => {
    props.setloading(true);
    const valid_data = await loginFields_Validation(
      _logindata,
      netInfo.isConnected,
    );
    await dispatch(Actions.AUTHENTICATE(valid_data))
      .then(res => {
        if (res.SUCCESS === true) {
          props.setloading(false);
          props.navigation.navigate('TabNav');
        }
      })
      .catch(err => {
        errorHandler(err);
        props.setloading(false);
      });
    props.setloading(false);
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={styles.inputContainer}>
        <Text style={Fontstyle.FONT_SMALL}>Workspace</Text>
        <TextInput
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="next"
          placeholder={Strings.str_sign_up_place_Workspace}
          autoCorrect={false}
          value={_logindata._workspace}
          onChangeText={text =>
            set_logindata({..._logindata, _workspace: text})
          }
          ref={input => {
            inputs._workspace = input;
          }}
          onBlur={() => checkWorkspace()}
        />
        <View style={styles.errorContainer}>
          {_workspace_error &&
            renderError(Strings.str_workspace_not_exist, 'username_error')}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={Fontstyle.FONT_SMALL}>Email</Text>
        <TextInput
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="next"
          placeholder={Strings.str_sign_up_place_email}
          autoCorrect={false}
          value={_logindata._email}
          onChangeText={text => set_logindata({..._logindata, _email: text})}
          ref={input => {
            inputs._email = input;
          }}
          onBlur={() => checkWorkspace()}
          onSubmitEditing={() => {
            focusNextField('_password');
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={Fontstyle.FONT_SMALL}>Password</Text>
        <TextInput
          style={[Fontstyle.FONT_SMALL, styles.input]}
          returnKeyType="done"
          placeholder={Strings.str_sign_up_place_password}
          autoCorrect={false}
          value={_logindata._password}
          onChangeText={text => set_logindata({..._logindata, _password: text})}
          ref={input => {
            inputs._password = input;
          }}
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
          height: Size.OF8,
          width: '60%',
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

export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: Size.OF1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Color.white,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  inputContainer: {
    height: Platform.OS === 'ios' ? Size.OF13 : Size.OF14,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    height: Size.OF6,
    width: '100%',
    color: Color.gray,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Color.light_gray,
  },
  errorContainer: {
    marginTop: 6,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
});
// export default Login;
