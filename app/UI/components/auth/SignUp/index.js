/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ErrorMessage} from 'reusables/ErrorMessage';
import Input from '../../../reusables/Input';

import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Color from '../../../styles/Color';
import Button from '../../../reusables/Button';
import Fontstyle from '../../../styles/Fontstyle';

import {
  signupFields_Validation,
  isworkspace_exist,
} from '../functions/validator';
import {SnackMessage, NONetworkAlert} from '../../../../functions/message';
import {
  get_Plans,
  set_Users,
  plan_Checker,
} from '../functions/signup_functions';
import Actions from 'actions';

import Gradientview from '../../../reusables/Gradientview';
const SignUp = props => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [_switch, set_switch] = useState(true);
  const [_plans, set_plans] = useState(null);
  const [_workspace_error, set_workspace_error] = useState(false);
  const [_signupdata, set_signupdata] = useState({
    _firstname: '',
    _lastname: '',
    _workspace: '',
    _companyemail: '',
    _password: '',
    _confirmpassword: '',
  });
  const _workspaceref = useRef(null);
  const _firstnameref = useRef(null);
  const _lastnameref = useRef(null);
  const _companyemailref = useRef(null);
  const _passwordref = useRef(null);
  const _confirmpasswordref = useRef(null);

  useEffect(() => {
    if (_switch) {
      return set_plans(null);
    }
  }, [_switch]);

  moveTo_viewPlans = async () => {
    set_switch(false);
    props.setloading(true);
    try {
      if (!netInfo.isConnected) {
        return NONetworkAlert();
      }
      const plans = await get_Plans();
      set_plans(plans);
      props.setloading(false);
      //signupFields_Validation(_signupdata);
    } catch (err) {
      props.setloading(false);
      SnackMessage(err.message);
    }
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

  signup = async () => {
    props.setloading(true);
    try {
      if (!netInfo.isConnected) {
        return NONetworkAlert();
      }
      const res = await dispatch(
        Actions.SIGNUP(plan_Checker(_plans, _signupdata)),
      );
      props.setloading(false);
      props.navigation.navigate('Welcome', {data: res});
    } catch (err) {
      props.setloading(false);
      SnackMessage(err.message);
    }
  };

  checkWorkspace = async () => {
    try {
      props.setloading(true);
      const isExist = await isworkspace_exist(_signupdata._workspace);
      if (isExist) {
        set_workspace_error(true);
        _workspaceref.current.focus();
      } else {
        set_workspace_error(false);
        _firstnameref.current.focus();
      }
      props.setloading(false);
    } catch (err) {
      console.warn(err);
      props.setloading(false);
    }
  };

  renderError = (errorMsg, errID) => {
    return <ErrorMessage errorMessage={errorMsg} errorID={errID} />;
  };

  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      {_switch && (
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View
            style={{
              height: Size.OF11,
              width: '100%',
              justifyContent: 'center',
              marginTop: Size.OF1,
            }}>
            <Text style={Fontstyle.FONT_SMALL}>Workspace</Text>
            <TextInput
              ref={_workspaceref}
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="next"
              placeholder={Strings.str_sign_in_place_Workspace}
              autoCorrect={false}
              value={_signupdata._workspace}
              onChangeText={text =>
                set_signupdata({..._signupdata, _workspace: text})
              }
              onSubmitEditing={() => checkWorkspace()}
            />
            <View style={styles.errorContainer}>
              {_workspace_error &&
                renderError(
                  Strings.str_workspace_already_exist,
                  'username_error',
                )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Size.OF1,
              width: '100%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: Size.OF11,
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={Fontstyle.FONT_SMALL}>
                {Strings.str_sign_up_firstname}
              </Text>
              <TextInput
                ref={_firstnameref}
                style={[
                  Fontstyle.FONT_SMALL,
                  styles.input,
                  {width: '90%', alignSelf: 'flex-start'},
                ]}
                returnKeyType="next"
                placeholder={Strings.str_sign_in_place_firstname}
                autoCorrect={false}
                value={_signupdata._firstname}
                onChangeText={text =>
                  set_signupdata({..._signupdata, _firstname: text})
                }
                onSubmitEditing={() => _lastnameref.current.focus()}
              />
            </View>
            <View
              style={{
                height: Size.OF11,
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={Fontstyle.FONT_SMALL}>
                {Strings.str_sign_up_lastname}
              </Text>
              <TextInput
                ref={_lastnameref}
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                autoCorrect={false}
                placeholder={Strings.str_sign_in_place_lastname}
                value={_signupdata._lastname}
                onChangeText={text =>
                  set_signupdata({..._signupdata, _lastname: text})
                }
                onSubmitEditing={() => _companyemailref.current.focus()}
              />
            </View>
          </View>
          <View
            style={{
              height: Size.OF11,
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text style={Fontstyle.FONT_SMALL}>
              {Strings.str_sign_up_companyemail}
            </Text>
            <TextInput
              ref={_companyemailref}
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="next"
              placeholder={Strings.str_sign_in_place_email}
              autoCorrect={false}
              value={_signupdata._companyemail}
              onChangeText={text =>
                set_signupdata({..._signupdata, _companyemail: text})
              }
              onSubmitEditing={() => _passwordref.current.focus()}
            />
          </View>
          <View
            style={{
              height: Size.OF11,
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text style={Fontstyle.FONT_SMALL}>
              {Strings.str_sign_up_password}
            </Text>
            <TextInput
              ref={_passwordref}
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="next"
              placeholder={Strings.str_sign_in_place_password}
              secureTextEntry={true}
              autoCorrect={false}
              value={_signupdata._password}
              onChangeText={text =>
                set_signupdata({..._signupdata, _password: text})
              }
              onSubmitEditing={() => _confirmpasswordref.current.focus()}
            />
          </View>
          <View
            style={{
              height: Size.OF10,
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text style={Fontstyle.FONT_SMALL}>
              {Strings.str_sign_up_confirm_password}
            </Text>
            <TextInput
              ref={_confirmpasswordref}
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="done"
              placeholder={Strings.str_sign_in_place_confirm_password}
              autoCorrect={false}
              secureTextEntry={true}
              value={_signupdata._confirmpassword}
              onChangeText={text =>
                set_signupdata({..._signupdata, _confirmpassword: text})
              }
            />
          </View>

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
                      width: '100%',
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
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
            onPress={()=>{
              set_switch(true);
            }}
              style={{
                height: Size.OF7,
                width: Size.OF7,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.primary2,
                borderRadius: 30,
              }}>
              <Image
                source={require('../../../../assets/icons/symbols/backarrow.png')}
                style={{
                  height: '40%',
                  width: '50%',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: Size.OF6,
    color: Color.gray,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Color.light_gray,
  },
});

export default SignUp;
