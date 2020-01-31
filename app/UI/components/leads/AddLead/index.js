/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import useBackHandler from 'hooks/useBackHandler';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import {ErrorMessage} from 'reusables/ErrorMessage';
import Containerview from '../../../reusables/Containerview';
import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Fontstyle from '../../../styles/Fontstyle';
import Color from '../../../styles/Color';
import Actions from 'actions';
import {search_lead} from '../functions/searctlead';
import Button from '../../../reusables/Button';
import IsEmpty from '../../../../utils/IsEmpty';
import Expandable from './Expandable';
import {persolInfo_validator,addlead_validator } from './validatorfunctions';
import validate from 'utils/validation';
import {getAllMembers} from '../functions/getAllmembers'
let nextId = 1;
const AddLead = props => {

  const dispatch = useDispatch();
  const [_addlead, set_addlead] = useState({
    _firstname: '',
    _lastname: '',
    _email: '',
    _phone: '',
    _company: '',
    _worth: '',
    _address: '',
    _city: '',
    _state: '',
    _pincode: '',
    _website: '',
    _about:'',
  });
  const [_addlead_errors, set_addlead_errors] = useState({
    _firstname: '',
    _lastname: '',
    _email: '',
    _phone: '',
    _company: '',
    _worth: '',
    _address: '',
    _city: '',
    _state: '',
    _pincode: '',
    _website: '',
  });
  const opacity = new Animated.Value(0);
  const [_source, set_source] = useState([
    {
      _id: 1,
      _name: 'Facebook',
      src: require('icons/leads/superhot.png'),
      value: false,
    },
    {
      _id: 2,
      _name: 'LinkedIn',
      src: require('icons/leads/hot.png'),
      value: false,
    },
    {
      _id: 3,
      _name: 'Instagram',
      src: require('icons/leads/warm.png'),
      value: false,
    },
    {
      _id: 4,
      _name: 'Others',
      src: require('icons/leads/cold.png'),
      value: false,
    },
  ]);
  const [_switch, set_switch] = useState({
    _personal: true,
    _addsource: false,
    _addtag: false,
    _otheraccounts: false,
    _address: false,
    _about: false,
  });
  const [inputs, set_inputs] = useState({});
  const [_owntag, set_owntag] = useState('');
  const [_other_accounts, set_other_accounts] = useState({
    facebook:'',
    linkedin:'',
    instagram:'',
    others:'',
  });
  const [_selectedtags, set_selectedtags] = useState([]);
  const [_recenttags, set_recenttags] = useState([
    {
      _name: 'followUp',
    },
    {
      _name: 'meeting',
    },
    {
      _name: 'Priority',
    },
  ]);
  const [_assigne, set_assigne] = useState('');
  const [_assignes_accounts, set_assignes_accounts] = useState([]);
  // useEffect(() => {
  //   Animated.timing(opacity, {
  //     toValue: 1,
  //     duration: 500
  //   }).start();
  // }, []);

  useBackHandler(() => {
    if (_switch._personal) {
      
    }
    if (_switch._addsource) {
      set_switch({
        _personal: true,
        _addsource: false,
        _addtag: false,
        _otheraccounts: false,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._addtag) {
      set_switch({
        _personal: false,
        _addsource: true,
        _addtag: false,
        _otheraccounts: false,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._otheraccounts) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: true,
        _otheraccounts: false,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._address) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: true,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._about) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: false,
        _address: true,
        _about: false,
      });
      return true;
    }
  });
  nextHandler=()=>{
    if (_switch._personal) {
      persolInfo_validator(_addlead).then(()=>{
        set_switch({
          _personal: false,
          _addsource: true,
          _addtag: false,
          _otheraccounts: false,
          _address: false,
          _about: false,
        });
        return true;
      }).catch((err)=>set_addlead_errors(err))
      
    }
    if (_switch._addsource) {
      const _sorceselected=_source.some((item)=>{
        return item.value===true
      })
      if(_sorceselected){
        set_switch({
          _personal: false,
          _addsource: false,
          _addtag: true,
          _otheraccounts: false,
          _address: false,
          _about: false,
        });
        return true;
      }

    }
    if (_switch._addtag) {
      if(_selectedtags.length>0){
        set_switch({
          _personal: false,
          _addsource: false,
          _addtag: false,
          _otheraccounts: true,
          _address: false,
          _about: false,
        });
        return true;
      }
    }
    if (_switch._otheraccounts) {
        set_switch({
          _personal: false,
          _addsource: false,
          _addtag: false,
          _otheraccounts: false,
          _address: true,
          _about: false,
        });
      return true;
    }
    if (_switch._address) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: false,
        _address: false,
        _about: true,
      });
       getAllMembers().then((res)=>{
        set_assignes_accounts(res)
        set_assigne(res[0])
       
       }).catch();
     
      return true;
    }
    if (_switch._about) {
      addlead_validator(_addlead,_source,_selectedtags,_other_accounts,_assigne)
      .then((res)=>{
        dispatch(Actions.ADD_LEAD(res,leadAdd_SUCCESS));
      })
      return true;
    }
  }
  leadAdd_SUCCESS=()=>{
    props.navigation.navigate('Leads'); 
  }  
backHandler=()=>{
    if (_switch._personal) {
      props.navigation.goBack();
      return true;
    }
    if (_switch._addsource) {
      set_switch({
        _personal: true,
        _addsource: false,
        _addtag: false,
        _otheraccounts: false,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._addtag) {
      set_switch({
        _personal: false,
        _addsource: true,
        _addtag: false,
        _otheraccounts: false,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._otheraccounts) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: true,
        _otheraccounts: false,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._address) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: true,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._about) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: false,
        _address: true,
        _about: false,
      });
      return true;
    }
  }
  skipHandler=()=>{
    if (_switch._personal) {
      persolInfo_validator(_addlead).then(()=>{
        set_switch({
          _personal: false,
          _addsource: true,
          _addtag: false,
          _otheraccounts: false,
          _address: false,
          _about: false,
        });
        return true;
      }).catch((err)=>set_addlead_errors(err))

    }
    if (_switch._addsource) {
        set_switch({
          _personal: false,
          _addsource: false,
          _addtag: true,
          _otheraccounts: false,
          _address: false,
          _about: false,
        });
        return true;

    }
    if (_switch._addtag) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: true,
        _address: false,
        _about: false,
      });
      return true;
    }
    if (_switch._otheraccounts) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: false,
        _address: true,
        _about: false,
      });
      return true;
    }
    if (_switch._address) {
      set_switch({
        _personal: false,
        _addsource: false,
        _addtag: false,
        _otheraccounts: false,
        _address: false,
        _about: true,
      });
      return true;
    }
    if (_switch._about) {
      return true;
    }
  }
  deleteNinja = id => {
    let ninjas = _selectedtags.filter(ninja => {
      return ninja._id !== id;
    });
    set_selectedtags(ninjas);
  };
  addNinja = ninja2 => {
    ninja2._id = nextId++;
    let ninjas = [..._selectedtags, ninja2];
    let clonedArr = [...ninjas];
    const newArray = [];
    clonedArr.forEach(obj => {
      if (!newArray.some(o => o._name === obj._name)) {
        newArray.push({...obj});
      }
    });
    set_selectedtags(newArray);
  };

  selectsource = id => {
    const array = [..._source];
    array.map((item, key) =>
      item._id === id
        ? (array[key].value = !array[key].value)
        : (array[key].value = false),
    );
    set_source(array);
  };

getValue = (item)=>{
  console.warn(item);
  //set_otherac([..._otherac,item])
  let arr = [..._other_accounts];
  const index = arr.findIndex((e)=>e.key === item.key);
  if (index === -1)
  {
    arr.push(item);
  }
  else {
    arr[index] = item;
  }
  set_other_accounts(arr);
  console.warn(arr);
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
   <Containerview>
      <View style={[styles.mainContainer]}>
        <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between',marginHorizontal:Size.OF2}}>
        <Text
          style={[
            Fontstyle.FONT_XLARGE,
            {
              color: Color.primary,
              marginVertical: Size.OF2,
            },
          ]}>
          Add Lead
        </Text>
       {!(_switch._personal || _switch._about ) &&
       <TouchableOpacity
       onPress={()=>skipHandler()}
       style={{height:Size.OF5,width:Size.OF10,alignItems:'flex-end'}}
       >
       <Text
          style={[
            Fontstyle.FONT_MEDIUM_SIMPLE,
            {
              color: Color.gray,
              marginVertical: Size.OF2,
            },
          ]}>
          Skip
        </Text>
        </TouchableOpacity>}
        </View>

        {_switch._personal && (
        <View style={{flex: 1, width: '90%'}}>
              <ScrollView>
              <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                alignSelf: 'center',
                height: Size.OF14,
              }}>
              <View style={styles.inputContainer}>
                <Text style={Fontstyle.FONT_SMALL}>First Name</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_addlead._firstname}
                  onChangeText={text =>
                    set_addlead({..._addlead, _firstname: text})
                  }
                  ref={input => {
                    inputs._firstname = input;
                  }}
                  onBlur={()=>{
                    let firstname_error = validate.stringValidation(_addlead._firstname);
                    if (firstname_error.isEmpty) {
                      set_addlead_errors({..._addlead_errors,_firstname:'enter firstname'});
                    }
                    else {
                      if (!firstname_error.valid) {
                        set_addlead_errors({..._addlead_errors,_firstname:'enter valid firstname'});
                      }
                      else{
                        set_addlead_errors({..._addlead_errors,_firstname:null});
                      }
                    }
                  }}
                  onSubmitEditing={() => {
                      focusNextField('_lastname');
                  }}
                />
           <View style={styles.errorContainer}>
          {!IsEmpty(_addlead_errors._firstname) &&
            renderError(_addlead_errors._firstname, 'firstname_error')}
        </View>
              </View>
              <View style={[styles.inputContainer, {marginLeft: Size.OF2}]}>
                <Text style={Fontstyle.FONT_SMALL}>Last Name</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_addlead._lastname}
                  onChangeText={text =>
                    set_addlead({..._addlead, _lastname: text})
                  }
                  ref={input => {
                    inputs._lastname = input;
                  }}
                  onBlur={()=>{
                    let lastname_error = validate.stringValidation(_addlead._lastname);
                    if (lastname_error.isEmpty) {
                      set_addlead_errors({..._addlead_errors,_lastname:'enter lastname'});
                    }
                    else {
                      if (!lastname_error.valid) {
                        set_addlead_errors({..._addlead_errors,_lastname:'enter valid lastname'});
                      }
                      else{
                        set_addlead_errors({..._addlead_errors,_lastname:null});
                      }
                    }
                  }}
                  onSubmitEditing={() => {
                    focusNextField('_email');
                  }}
                />
                <View style={styles.errorContainer}>
          {!IsEmpty(_addlead_errors._lastname) &&
            renderError(_addlead_errors._lastname, 'firstname_error')}
        </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>Email address</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                keyboardType={'email-address'}
                value={_addlead._email}
                onChangeText={text => set_addlead({..._addlead, _email: text})}
                ref={input => {
                  inputs._email = input;
                }}
                onBlur={()=>{
                  let email_error = validate.emailValidation(_addlead._email);
                  if (email_error.isEmpty) {
                    set_addlead_errors({..._addlead_errors,_email:'enter email'});
                  }
                  else {
                    if (!email_error.valid) {
                      set_addlead_errors({..._addlead_errors,_email:'enter valid email'});
                    }
                    else{
                      set_addlead_errors({..._addlead_errors,_email:null});
                    }
                  }
                }}
                onSubmitEditing={() => {
                  focusNextField('_phone');
                }}
              />
              <View style={styles.errorContainer}>
          {!IsEmpty(_addlead_errors._email) &&
            renderError(_addlead_errors._email, 'lastname_error')}
        </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>Phone Number</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                keyboardType={'number-pad'}
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._phone}
                onChangeText={text => set_addlead({..._addlead, _phone: text})}
                ref={input => {
                  inputs._phone = input;
                }}
                onBlur={()=>{
                  let phone_error = validate.phonenumberValidation(_addlead._phone);
                  if (phone_error.isEmpty) {
                    set_addlead_errors({..._addlead_errors,_phone:'please enter phone number'});
                  }
                  else {
                    if (!phone_error.valid) {
                      set_addlead_errors({..._addlead_errors,_phone:'please enter valid phone number'});
                    }
                    else{
                      set_addlead_errors({..._addlead_errors,_phone:null});
                    }
                  }
                }}
                onSubmitEditing={() => {
                  focusNextField('_company');
                }}
              />
              <View style={styles.errorContainer}>
          {!IsEmpty(_addlead_errors._phone) &&
            renderError(_addlead_errors._phone, 'phone_error')}
        </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>Company</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._company}
                onChangeText={text =>
                  set_addlead({..._addlead, _company: text})
                }
                ref={input => {
                  inputs._company = input;
                }}
                onBlur={()=>{
                  if (IsEmpty(_addlead._company)) {
                    set_addlead_errors({..._addlead_errors,_company:'please enter your Company name'});
                  }
                  else {
                      set_addlead_errors({..._addlead_errors,_company:null});
                  }
                }}
                onSubmitEditing={() => {
                  focusNextField('_worth');
                }}
              />
              <View style={styles.errorContainer}>
          {!IsEmpty(_addlead_errors._company) &&
            renderError(_addlead_errors._company, 'company_error')}
        </View>
            </View>
              <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: Size.OF3,
                    width: Size.OF3,
                    backgroundColor: 'red',
                  }}
                />
                <Text style={Fontstyle.FONT_SMALL}>Worth Amount</Text>
              </View>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="done"
                keyboardType={'number-pad'}
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._worth}
                onChangeText={text => set_addlead({..._addlead, _worth: text})}
                ref={input => {
                  inputs._worth = input;
                }}
                onBlur={()=>{
                  let worth_error = validate.numberValidation(_addlead._worth);
                  if (worth_error.isEmpty) {
                    set_addlead_errors({..._addlead_errors,_worth:'please enter worth Amount'});
                  }
                  else {
                    if (!worth_error.valid) {
                      set_addlead_errors({..._addlead_errors,_worth:'please enter valid worth Amount'});
                    }
                    else{
                      set_addlead_errors({..._addlead_errors,_worth:null});
                    }
                  }
                }}
                onSubmitEditing={() => {}}
              />
              <View style={styles.errorContainer}>
          {!IsEmpty(_addlead_errors._worth) &&
            renderError(_addlead_errors._worth, 'worth_error')}
        </View>
            </View>
              </ScrollView>
              </View>
        )}
        {_switch._addsource &&
        <View style={{flex: 1, width: '90%'}}>
              <ScrollView>
              <Text style={Fontstyle.FONT_SMALL}>Select Source</Text>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              {_source.map((item, index) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => selectsource(item._id)}
                  style={{
                    width: '100%',
                    marginVertical:Size.OF1,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: item.value ? Color.red : Color.primary,
                    borderRadius: 10,
                    height: Size.OF8,
                  }}>
                  <Text
                    style={[
                      Fontstyle.FONT_SMALL,
                      {color: item.value ? Color.red : Color.primary},
                    ]}>
                    {item._name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
              </ScrollView>
              </View>
        }
        {_switch._addtag &&
        <View style={{flex: 1, width: '90%'}}>
                <ScrollView>
                <Text style={[Fontstyle.FONT_SMALL]}>
              Selected Tag
            </Text>
                {_selectedtags.length == 0 ? (
              <Text
                style={[
                  Fontstyle.FONT_MEDIUM,
                  {alignSelf: 'center', marginVertical: Size.OF2},
                ]}>
                No Selected Tags
              </Text>
            ) : (
              <View style={{flex: 1.5, width: '90%', alignSelf: 'center'}}>
                <ScrollView style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {_selectedtags.map((item, index) => (

                      <TouchableOpacity
                      key={item._id}
                        onPress={() => deleteNinja(item._id)}
                        style={{
                          marginRight: Size.OF1 / 2,
                          paddingHorizontal: Size.OF3 / 1.2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: Size.OF7,
                          marginVertical: Size.OF1,
                          borderRadius: 25,
                          backgroundColor: Color.primary,
                        }}>
                        <Text
                          style={[
                            Fontstyle.FONT_MEDIUM_SMALL,
                            {color: Color.white},
                          ]}>
                          {item._name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                </ScrollView>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={[styles.inputContainer, {marginRight: Size.OF3}]}>
                <Text style={Fontstyle.FONT_SMALL}>Add your Own Tag</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_owntag}
                  onChangeText={text => set_owntag(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => addNinja({_name: _owntag})}
                style={{
                  width: Size.OF6,
                  height: Size.OF6,
                  backgroundColor: 'red',
                  borderRadius: 25,
                }}
              />
            </View>
            <View style={{width: '100%'}}>
              <Text style={[Fontstyle.FONT_SMALL, {marginVertical: Size.OF2}]}>
                Most used Tag
              </Text>
              <FlatList
                horizontal={true}
                data={_recenttags}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => addNinja(item)}
                    style={{
                      marginRight: Size.OF1 / 2,
                      paddingHorizontal: Size.OF2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: Size.OF7,
                      borderRadius: 25,
                      backgroundColor: Color.white,
                      borderWidth: 2,
                      borderColor: Color.primary,
                    }}>
                    <Text
                      style={[
                        Fontstyle.FONT_MEDIUM_SMALL,
                        {color: Color.primary},
                      ]}>
                      {item._name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
                </ScrollView>
                </View>
        }
        {_switch._otheraccounts &&
        <View style={{flex: 1, width: '90%'}}> 
             {/* <Expandable getValue={getValue} _other_accounts={_other_accounts}/> */}
             <Text style={Fontstyle.FONT_MEDIUM}>Add media Accounts(Optinal)</Text>
             <View style={styles.inputContainer}>
                <Text style={Fontstyle.FONT_SMALL}>Facebook</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_other_accounts.facebook}
                  onChangeText={text =>
                    set_other_accounts({..._other_accounts, facebook: text})
                  }
            
                />
                </View>
                <View style={styles.inputContainer}>
                <Text style={Fontstyle.FONT_SMALL}>LinkedIn</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_other_accounts.linkedin}
                  onChangeText={text =>
                    set_other_accounts({..._other_accounts, linkedin: text})
                  }
            
                />
                </View>
                <View style={styles.inputContainer}>
                <Text style={Fontstyle.FONT_SMALL}>Instagram</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_other_accounts.instagram}
                  onChangeText={text =>
                    set_other_accounts({..._other_accounts, instagram: text})
                  }
            
                />
                </View>
                <View style={styles.inputContainer}>
                <Text style={Fontstyle.FONT_SMALL}>Others</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_other_accounts.others}
                  onChangeText={text =>
                    set_other_accounts({..._other_accounts, others: text})
                  }
            
                />
                </View>
                <View style={styles.inputContainer}>
               
                </View>
        </View>
        }
        {_switch._address &&
        <View style={{flex: 1, width: '90%'}}>
               <ScrollView>
               <Text style={Fontstyle.FONT_MEDIUM}>Address Information(Optinal)</Text>
               <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>Address</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._address}
                onChangeText={text =>
                  set_addlead({..._addlead, _address: text})
                }
                ref={input => {
                  inputs._address = input;
                }}
                onSubmitEditing={() => {
                  focusNextField('_city');
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>City</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._city}
                onChangeText={text => set_addlead({..._addlead, _city: text})}
                ref={input => {
                  inputs._city = input;
                }}
                onSubmitEditing={() => {
                  focusNextField('_state');
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>State</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._state}
                onChangeText={text => set_addlead({..._addlead, _state: text})}
                ref={input => {
                  inputs._state = input;
                }}
                onSubmitEditing={() => {
                  focusNextField('_pincode');
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>Pincode</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._pincode}
                onChangeText={text =>
                  set_addlead({..._addlead, _pincode: text})
                }
                ref={input => {
                  inputs._pincode = input;
                }}
                onSubmitEditing={() => {
                  focusNextField('_website');
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: Size.OF3,
                    width: Size.OF3,
                    backgroundColor: 'red',
                  }}
                />
                <Text style={Fontstyle.FONT_SMALL}>Website</Text>
              </View>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="done"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._website}
                onChangeText={text =>
                  set_addlead({..._addlead, _website: text})
                }
                ref={input => {
                  inputs._website = input;
                }}
                onSubmitEditing={() => {}}
              />
            </View>
               </ScrollView>
               </View>
        }
        {_switch._about &&
        <View style={{flex: 1, width: '90%'}}>
           <ScrollView>
           <View style={{height:Size.OF10,width:'100%',justifyContent:'center'}}>
                <Text style={Fontstyle.FONT_SMALL}>Assign Representative</Text>
                <View style={{flex:1,justifyContent:'center'}}>
        <Text style={[Fontstyle.FONT_MEDIUM_SIMPLE,{borderBottomWidth:0.5}]}>{_assigne.name}</Text>
                </View>
            
              </View>
              <FlatList
                horizontal={true}
                data={_assignes_accounts}
                renderItem={({item}) => (
                  <TouchableOpacity style={{height: Size.OF12,marginHorizontal:Size.OF1,width:Size.OF12,justifyContent:'space-between',alignItems:'center'}}>
                    <View
                    onPress={() => addNinja(item)}
                    style={{
                      height: Size.OF9,
                      width:Size.OF9,
                      borderRadius: 10,
                    }}>
                       <Image
                    source={require('icons/leads/user.png')}
                    style={{
                      flex:1,
                      height:null,
                      width:null,
                      resizeMode: 'cover',
                    }}
                  />
                  </View>
                  <Text
                  numberOfLines={1}
                      style={[
                        Fontstyle.FONT_XSMALL,
                        {color: Color.primary,textAlign:'center'},
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                 
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={{height: Size.OF25,marginVertical:Size.OF5,justifyContent:'center',width:'100%'}}>
                <Text style={[Fontstyle.FONT_SMALL]}>About</Text>
                <TextInput
                  style={[
                    Fontstyle.FONT_SMALL,
                    {
                      height:Size.OF20,
                      borderRadius:10,
                      borderWidth:1,
                      borderColor:Color.gray
                    }
                  ]}
                  multiline={true}
                  autoCorrect={false}
                  value={_addlead._about}
                  onChangeText={text =>
                    set_addlead({..._addlead, _about: text})
                  }
                  ref={input => {
                    inputs._firstname = input;
                  }}
                  onSubmitEditing={() => {
                    focusNextField('_lastname');
                  }}
                />
              </View>
           </ScrollView>
           </View>
        }
        <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
  {!_switch._personal ?     <TouchableOpacity
              onPress={()=>backHandler()}
              style={{
                height: Size.OF7,
                width: Size.OF7,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.red,
                borderRadius: 30,
                marginLeft:Size.OF2,
              }}>
              <Image
                source={require('icons/symbols/backarrow.png')}
                style={{
                  height: Size.OF3,
                  width: Size.OF3,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>:<View/>}
            <View
               style={{
                 height: Size.OF12,
                 width: '50%',
                 justifyContent: 'center',
                 marginHorizontal: Size.OF2,
               }}>

               <Button
                 onPressedFunction={() =>nextHandler()}
                 backColor={Color.red}
                 borderColor={Color.red}
                 label={_switch._about?'Submit':'Next'}
                 textColor={Color.white}
               />
             </View>
        </View>

      </View>
      </Containerview>
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
    height: Size.OF14,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
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
export default AddLead;
