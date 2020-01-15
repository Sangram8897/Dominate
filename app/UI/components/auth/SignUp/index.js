/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import Input from '../../../reusables/Input';

import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Color from '../../../styles/Color';
import Button from '../../../reusables/Button';
import Fontstyle from '../../../styles/Fontstyle';

import {signupData} from '../../../model/signup';
import {SnackMessage, NONetworkAlert} from '../../../../functions/message';

import Actions from 'actions';

const SignUp = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [_signupdata, set_signupdata] = useState({
    _firstname: '',
    _lastname: '',
    _workspace: '',
    _companyemail: '',
    _password: '',
    _confirmpassword: '',
  });

  login = async () => {
    dispatch(Actions.LOGOUT());
    // try {
    //   if (!netInfo.isConnected) {
    //     return NONetworkAlert();
    //   }
    //   //signupData(_signupdata);
    // } catch (err) {
    //   SnackMessage(err.message);
    // }
  };

  return (
    <View style={{flex: 1}}>
      <Input
        label={'Workspace'}
        value={_signupdata._workspace}
        onChangeText={text =>
          set_signupdata({..._signupdata, _workspace: text})
        }
        maxLength={10}
        autoCorrect={false}
      />
      <View style={{flexDirection: 'row', width: '95%', alignSelf: 'center'}}>
        <Input
          label={'First Name'}
          value={_signupdata._firstname}
          onChangeText={text =>
            set_signupdata({..._signupdata, _firstname: text})
          }
          maxLength={10}
          autoCorrect={false}
        />
        <Input
          label={'Last Name'}
          value={_signupdata._lastname}
          onChangeText={text =>
            set_signupdata({..._signupdata, _lastname: text})
          }
          maxLength={10}
          autoCorrect={false}
        />
      </View>
      <Input
        label={'Company Email'}
        value={_signupdata._companyemail}
        onChangeText={text =>
          set_signupdata({..._signupdata, _companyemail: text})
        }
        maxLength={10}
        autoCorrect={false}
      />
      <Input
        label={'Password'}
        value={_signupdata._password}
        onChangeText={text => set_signupdata({..._signupdata, _password: text})}
        maxLength={10}
        secureTextEntry={true}
        autoCorrect={false}
      />
      <Input
        label={'Confirm Password'}
        value={_signupdata._confirmpassword}
        onChangeText={text =>
          set_signupdata({..._signupdata, _confirmpassword: text})
        }
        maxLength={10}
        secureTextEntry={true}
        autoCorrect={false}
      />

      <View
        style={{
          height: Size.OF10,
          width: '50%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginVertical: Size.OF1,
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

export default SignUp;

{
  /*  */
}
