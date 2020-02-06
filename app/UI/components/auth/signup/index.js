/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ErrorMessage} from 'reusables/ErrorMessage';
import Gradientview from 'reusables/Gradientview';
import Fontstyle from 'styles/Fontstyle';
import Input from 'reusables/Input';
import Strings from 'styles/String';
import Size from 'styles/Size';
import Color from 'styles/Color';
import Button from 'reusables/Button';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import {
  get_Plans,
  set_Users,
  plan_Checker,
} from '../functions/signup_functions';
import {
  signupFields_Validation,
  isworkspace_exist,
} from '../functions/validator';
import IsEmpty from '../../../../utils/IsEmpty';
import validate from 'utils/validation';
import {Is_FieldValid} from 'utils/fieldvalidator';
import Actions from 'action';

const SignUp = props => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [_switch, set_switch] = useState(true);
  const [_plans, set_plans] = useState(null);
  const [_workspace_error, set_workspace_error] = useState(false);
  const [_planserror, set_planserror] = useState(false);

  const [_signupdata, set_signupdata] = useState({
    _workspace: '',
    _firstname: '',
    _lastname: '',
    _companyemail: '',
    _password: '',
    _confirmpassword: '',
  });
  const [_signupdata_errors, set_signupdata_errors] = useState({
    _workspace: '',
    _firstname: '',
    _lastname: '',
    _companyemail: '',
    _password: '',
    _confirmpassword: '',
  });
  const [inputs, set_inputs] = useState({});

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
      //  SnackMessage(err.message);
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
    set_planserror(false);
  };

  signup = async () => {
    props.setloading(true);
    try {
      if (!netInfo.isConnected) {
        return NONetworkAlert();
      }
      await dispatch(Actions.SIGNUP(plan_Checker(_plans, _signupdata)))
        .then(res => {
          if (res.SUCCESS === true) {
            props.navigation.navigate('Welcome', {data: res.Responce});
          }
        })
        .catch(err => {});
      props.setloading(false);
    } catch (err) {
      props.setloading(false);
      set_planserror(true);
      SnackMessage(err.message);
    }
  };

  checkWorkspace = async () => {
    try {
      props.setloading(true);
      const isExist = await isworkspace_exist(_signupdata._workspace);
      if (IsEmpty(_signupdata._workspace)) {
        set_signupdata_errors({
          ..._signupdata_errors,
          _workspace: 'Please enter workspace',
        });
      } else if (isExist) {
        set_signupdata_errors({
          ..._signupdata_errors,
          _workspace: Strings.str_workspace_already_exist,
        });
        // focusNextField('_workspace');
      } else {
        set_signupdata_errors({
          ..._signupdata_errors,
          _workspace: '',
        });
        focusNextField('_firstname');
      }
      props.setloading(false);
    } catch (err) {
      props.setloading(false);
    }
  };

  renderError = (errorMsg, errID) => {
    return <ErrorMessage errorMessage={errorMsg} errorID={errID} />;
  };

  focusNextField = id => {
    inputs[id].focus();
  };

  setRef = (id, input) => {
    inputs[id] = input;
  };
  return (
    <View style={{flex: 1, width: '100%'}}>
      {_switch && (
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View style={styles.inputContainer}>
            <Text style={Fontstyle.FONT_SMALL}>Workspace</Text>
            <TextInput
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="next"
              placeholder={Strings.str_sign_up_place_Workspace}
              autoCorrect={false}
              value={_signupdata._workspace}
              onChangeText={text =>
                set_signupdata({..._signupdata, _workspace: text})
              }
              ref={input => {
                inputs._workspace = input;
              }}
              onBlur={() => {
                if (IsEmpty(_signupdata._workspace)) {
                  set_signupdata_errors({
                    ..._signupdata_errors,
                    _workspace: 'Please enter workspace',
                  });
                } else {
                  checkWorkspace();
                }
              }}
            />
            <View style={styles.errorContainer}>
              {!IsEmpty(_signupdata_errors._workspace) &&
                renderError(_signupdata_errors._workspace, 'workspace_error')}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: Size.OF11,
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={Fontstyle.FONT_SMALL}>First Name</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_in_place_firstname}
                autoCorrect={false}
                value={_signupdata._firstname}
                onChangeText={text =>
                  set_signupdata({..._signupdata, _firstname: text})
                }
                ref={input => {
                  inputs._firstname = input;
                }}
                onBlur={async () => {
                  let valid = await Is_FieldValid(
                    'NAME',
                    'FirstName',
                    _signupdata._firstname,
                    'Enter ',
                  );
                  set_signupdata_errors({
                    ..._signupdata_errors,
                    _firstname: valid,
                  });
                }}
                onSubmitEditing={() => {
                  focusNextField('_lastname');
                }}
              />
              <View style={styles.errorContainer}>
                {!IsEmpty(_signupdata_errors._firstname) &&
                  renderError(_signupdata_errors._firstname, 'firstname_error')}
              </View>
            </View>
            <View
              style={{
                height: Size.OF11,
                flex: 1,
                marginLeft: Size.OF1,
                justifyContent: 'center',
              }}>
              <Text style={Fontstyle.FONT_SMALL}>Last Name</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_in_place_lastname}
                autoCorrect={false}
                value={_signupdata._lastname}
                onChangeText={text =>
                  set_signupdata({..._signupdata, _lastname: text})
                }
                ref={input => {
                  inputs._lastname = input;
                }}
                onBlur={async () => {
                  let valid = await Is_FieldValid(
                    'NAME',
                    'LastName',
                    _signupdata._lastname,
                    'Enter ',
                  );
                  set_signupdata_errors({
                    ..._signupdata_errors,
                    _lastname: valid,
                  });
                }}
                onSubmitEditing={() => {
                  focusNextField('_email');
                }}
              />
              <View style={styles.errorContainer}>
                {!IsEmpty(_signupdata_errors._lastname) &&
                  renderError(_signupdata_errors._lastname, 'lastname_error')}
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={Fontstyle.FONT_SMALL}>Email</Text>
            <TextInput
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="next"
              keyboardType={'email-address'}
              placeholder={Strings.str_sign_in_place_email}
              autoCorrect={false}
              value={_signupdata._companyemail}
              onChangeText={text =>
                set_signupdata({..._signupdata, _companyemail: text})
              }
              ref={input => {
                inputs._email = input;
              }}
              onBlur={async () => {
                let valid = await Is_FieldValid(
                  'EMAIL',
                  'Email',
                  _signupdata._companyemail,
                );
                set_signupdata_errors({
                  ..._signupdata_errors,
                  _companyemail: valid,
                });
              }}
              onSubmitEditing={() => {
                focusNextField('_password');
              }}
            />
            <View style={styles.errorContainer}>
              {!IsEmpty(_signupdata_errors._companyemail) &&
                renderError(_signupdata_errors._companyemail, 'email_error')}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={Fontstyle.FONT_SMALL}>Password</Text>
            <TextInput
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="next"
              placeholder={Strings.str_sign_in_place_password}
              autoCorrect={false}
              value={_signupdata._password}
              onChangeText={text =>
                set_signupdata({..._signupdata, _password: text})
              }
              ref={input => {
                inputs._password = input;
              }}
              onBlur={async () => {
                let valid = await Is_FieldValid(
                  'PASSWORD',
                  'Password',
                  _signupdata._password,
                );
                set_signupdata_errors({
                  ..._signupdata_errors,
                  _password: valid,
                });
              }}
              onSubmitEditing={() => {
                focusNextField('_confirmpassword');
              }}
            />
            <View style={styles.errorContainer}>
              {!IsEmpty(_signupdata_errors._password) &&
                renderError(_signupdata_errors._password, 'password_error')}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={Fontstyle.FONT_SMALL}>Confirm Password</Text>
            <TextInput
              style={[Fontstyle.FONT_SMALL, styles.input]}
              returnKeyType="done"
              placeholder={Strings.str_sign_in_place_confirm_password}
              autoCorrect={false}
              value={_signupdata._confirmpassword}
              onChangeText={text =>
                set_signupdata({..._signupdata, _confirmpassword: text})
              }
              ref={input => {
                inputs._confirmpassword = input;
              }}
            />
            <View style={styles.errorContainer}>
              {!IsEmpty(_signupdata_errors._confirmpassword) &&
                renderError(
                  _signupdata_errors._confirmpassword,
                  'confirmpassword_error',
                )}
            </View>
          </View>
          <View
            style={{
              height: Size.OF10,
              width: '60%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Button
              onPressedFunction={async () => {
                let errors = await signupFields_Validation(_signupdata);
                if (IsEmpty(errors)) {
                  moveTo_viewPlans();
                } else {
                  set_signupdata_errors(errors);
                }
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
                height: Platform.OS === 'ios' ? Size.OF10 * 5 : Size.OF9 * 6,
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
          <View style={styles.errorContainer}>
            {_planserror &&
              renderError(Strings.str_confirm_package, 'username_error')}
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
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
                source={require('icons/symbols/backarrow.png')}
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
    height: Platform.OS === 'ios' ? Size.OF11 : Size.OF12,
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
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
});
export default SignUp;
