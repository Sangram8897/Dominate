/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';

import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import Input from '../../../reusables/Input';

import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Color from '../../../styles/Color';
import Button from '../../../reusables/Button';
import Fontstyle from '../../../styles/Fontstyle';

import {
  signupFields_Validation,
  set_Users,
  plan_Checker,
} from './functions/validator';
import {SnackMessage, NONetworkAlert} from '../../../../functions/message';

import Actions from 'actions';

import Gradientview from '../../../reusables/Gradientview';
const colorcombo1 = [];
const SignUp = props => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [_switch, set_switch] = useState(true);
  const [_plans, set_plans] = useState(null);
  const [_signupdata, set_signupdata] = useState({
    _firstname: '',
    _lastname: '',
    _workspace: '',
    _companyemail: '',
    _password: '',
    _confirmpassword: '',
  });

  moveTo_viewPlans = async () => {
    try {
      if (!netInfo.isConnected) {
        return NONetworkAlert();
      }
      //await set_signupdata(signupFields_Validation(_signupdata));
      set_switch(false);
    } catch (err) {
      SnackMessage(err.message);
    }
  };
  useEffect(() => {
    if (_switch) {
      return set_plans(null);
    }
    if (_switch === false) {
      props.setloading(true);
      try {
        if (!netInfo.isConnected) {
          return NONetworkAlert();
        }
        dispatch(Actions.Plans_LOADING(onPlans_SUCCESS, onPlans_FAIL));
      } catch (err) {
        props.setloading(false);
        SnackMessage(err.message);
      }
    }
  }, [_switch]);

  onPlans_SUCCESS = plans => {
    props.setloading(false);
    set_plans(plans);
  };

  onPlans_FAIL = () => {
    props.setloading(false);
  };

  selectedItem = name => {
    const array = [..._plans];
    array.map((item, key) =>
      item.name === name
        ? (array[key].isEnterprise = !array[key].isEnterprise)
        : (array[key].isEnterprise = false),
    );
    set_plans(array);
  };

  signup = () => {
    props.setloading(true);
    try {
      if (!netInfo.isConnected) {
        return NONetworkAlert();
      }
      dispatch(
        Actions.SignUp_LOADING(
          plan_Checker(_plans, _signupdata),
          onSignup_SUCCESS,
          onSignup_FAIL,
        ),
      );
    } catch (err) {
      props.setloading(false);
      SnackMessage(err.message);
    }
  };
  onSignup_SUCCESS = res => {
    props.setloading(false);
    props.navigation.navigate('Welcome', {data: res});
  };

  onSignup_FAIL = () => {
    props.setloading(false);
    console.warn('fail');
  };
  return (
    <View style={{flex: 1, width: '100%'}}>
      {_switch && (
        <View style={{flex: 1, width: '100%'}}>
          <Input
            label={'Workspace'}
            value={_signupdata._workspace}
            onChangeText={text =>
              set_signupdata({..._signupdata, _workspace: text})
            }
            maxLength={10}
            autoCorrect={false}
          />
          <View
            style={{flexDirection: 'row', width: '95%', alignSelf: 'center'}}>
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
            onChangeText={text =>
              set_signupdata({..._signupdata, _password: text})
            }
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
                moveTo_viewPlans();
              }}
              backColor={Color.primary2}
              borderColor={Color.primary2}
              label={Strings.str_sign_up_next}
              textColor={Color.white}
            />
          </View>
        </View>
      )}
      {!_switch && (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ScrollView style={{width: '100%'}}>
            <View
              style={{
                height: Size.OF11 * 5,
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              {_plans &&
                _plans.map(item => (
                  <TouchableOpacity
                    onPress={() => selectedItem(item.name)}
                    key={item.name}
                    style={{
                      height: Size.OF10,
                      backgroundColor: 'red',
                      width: '90%',
                      borderRadius: 15,
                      overflow: 'hidden',
                    }}>
                    <Gradientview colors={['#C67EE0', '#5A56BE', '#470AA8']}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: item.isEnterprise
                            ? Color.tranparent
                            : Color.white,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: Size.OF2,
                        }}>
                        <Image
                          source={require('icons/astronut.png')}
                          style={{
                            height: Size.OF6,
                            width: Size.OF6,
                            resizeMode: 'contain',
                          }}
                        />
                        <View style={{flex: 1, marginLeft: Size.OF2}}>
                          <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Text
                              style={[
                                Fontstyle.FONT_LARGE,
                                {
                                  color: item.isEnterprise
                                    ? Color.white
                                    : Color.primary,
                                },
                              ]}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                              <Text
                                style={[
                                  Fontstyle.FONT_MEDIUM_LARGE,
                                  {
                                    color: item.isEnterprise
                                      ? Color.white
                                      : Color.primary,
                                  },
                                ]}>
                                {item.monthlyPrice}
                              </Text>
                            </View>
                            <View style={{flex: 2}}>
                              <Text
                                style={[
                                  Fontstyle.FONT_MEDIUM_ITALIC,
                                  {
                                    color: item.isEnterprise
                                      ? Color.white
                                      : Color.primary,
                                    marginLeft: '10%',
                                  },
                                ]}>
                                {set_Users(item.maxUsers)} Users
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Gradientview>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              width:'100%',
              justifyContent:'space-around',
              alignItems:'center'
            }}
          >
                     <View
            style={{
              height: Size.OF8,
              width: Size.OF8,
              justifyContent: 'center',
              marginVertical: Size.OF1,
              backgroundColor:Color.primary2,
              borderRadius:30,
            }}>
          
          </View>
                     <View
            style={{
              height: Size.OF10,
              width: '50%',
              justifyContent: 'center',
              marginVertical: Size.OF1,
            }}>
            <Button
              onPressedFunction={() => {
                signup();
              }}
              backColor={Color.primary2}
              borderColor={Color.primary2}
              label={Strings.str_sign_up}
              textColor={Color.white}
            />
          </View>
          </View>
          
 
        </View>
      )}
    </View>
  );
};

export default SignUp;
