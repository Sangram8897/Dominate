/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
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
  ScrollView,
} from 'react-native';
import Containerview from 'reusables/Containerview';
import Size from 'styles/Size';
import Strings from 'styles/String';
import Fontstyle from 'styles/Fontstyle';
import Color from 'styles/Color';
import Actions from 'actions';
import {search_lead} from '../functions/searctlead';
import Button from '../../../reusables/Button';
import IsEmpty from '../../../../utils/IsEmpty';
import Expandable from './Expandable';

let nextId = 1;
const AddLead = props => {
  const netInfo = useNetInfo();
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
  });
  const [_source, set_source] = useState([
    {
      _id: 1,
      _name: 'Facebook',
      src: require('icons/leads/superhot.png'),
      value: true,
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
  const [_owntag, set_owntag] = useState('');
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

  const [_switch, set_switch] = useState({
    _personal: true,
    _social: false,
    _address: false,
    _others: false,
    _tags: false,
    _about: false,
  });
  const [inputs, set_inputs] = useState({});

  useBackHandler(() => {
    if (_switch._address) {
      set_switch({
        _personal: true,
        _social: false,
        _address: false,
        _others: false,
      });
    } else {
      
    }
    return true;
  });
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

  focusNextField = id => {
    inputs[id].focus();
  };

  setRef = (id, input) => {
    inputs[id] = input;
  };
  return (
    <Containerview isLoading={false}>
      <View style={styles.mainContainer}>
        <Text
          style={[
            Fontstyle.FONT_XLARGE,
            {
              color: Color.primary,
              marginTop: Size.OF3,
              marginLeft: Size.OF4,
              width: '100%',
            },
          ]}>
          Add Lead
        </Text>
        {_switch._personal && (
          <View style={{flex: 1, width: '90%'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                alignSelf: 'center',
                height: Size.OF10,
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
                  onSubmitEditing={() => {
                    focusNextField('_lastname');
                  }}
                />
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
                  onSubmitEditing={() => {
                    focusNextField('_email');
                  }}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>Email address</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._email}
                onChangeText={text => set_addlead({..._addlead, _email: text})}
                ref={input => {
                  inputs._email = input;
                }}
                onSubmitEditing={() => {
                  focusNextField('_phone');
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={Fontstyle.FONT_SMALL}>Phone Number</Text>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="next"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._phone}
                onChangeText={text => set_addlead({..._addlead, _phone: text})}
                ref={input => {
                  inputs._phone = input;
                }}
                onSubmitEditing={() => {
                  focusNextField('_company');
                }}
              />
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
                onSubmitEditing={() => {
                  focusNextField('_worth');
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
                <Text style={Fontstyle.FONT_SMALL}>Worth Amount</Text>
              </View>
              <TextInput
                style={[Fontstyle.FONT_SMALL, styles.input]}
                returnKeyType="done"
                placeholder={Strings.str_sign_up_place_password}
                autoCorrect={false}
                value={_addlead._worth}
                onChangeText={text => set_addlead({..._addlead, _worth: text})}
                ref={input => {
                  inputs._worth = input;
                }}
                onSubmitEditing={() => {}}
              />
            </View>
            <View
              style={{
                height: Size.OF12,
                width: '50%',
                alignSelf: 'flex-end',
                justifyContent: 'center',
                marginHorizontal: Size.OF2,
              }}>
              <Button
                onPressedFunction={() =>
                  set_switch({
                    _personal: false,
                    _social: false,
                    _address: false,
                    _others: true,
                  })
                }
                backColor={Color.red}
                borderColor={Color.red}
                label={'Next'}
                textColor={Color.white}
              />
            </View>
          </View>
        )}

        {_switch._others && (
          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <Text style={Fontstyle.FONT_SMALL}>Select Source</Text>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              {_source.map((item, index) => (
                <TouchableOpacity
                  onPress={() => selectsource(item._id)}
                  style={{
                    width: '45%',
                    margin: Size.OF1,
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

            <View
              style={{
                height: Size.OF12,
                width: '50%',
                alignSelf: 'flex-end',
                justifyContent: 'center',
                marginHorizontal: Size.OF2,
              }}>
              <Button
                onPressedFunction={() =>
                  set_switch({
                    _personal: false,
                    _social: true,
                    _address: false,
                    _others: false,
                  })
                }
                backColor={Color.red}
                borderColor={Color.red}
                label={'Next'}
                textColor={Color.white}
              />
            </View>
          </View>
        )}
        {_switch._social && (
          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <Expandable />
            <View
              style={{
                height: Size.OF12,
                width: '50%',
                alignSelf: 'flex-end',
                justifyContent: 'center',
                marginHorizontal: Size.OF2,
              }}>
              <Button
                onPressedFunction={() =>
                  set_switch({
                    _personal: false,
                    _social: true,
                    _address: false,
                    _others: false,
                  })
                }
                backColor={Color.red}
                borderColor={Color.red}
                label={'Next'}
                textColor={Color.white}
              />
            </View>
          </View>
        )}
        {_switch._tags && (
          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <Text style={[Fontstyle.FONT_SMALL, {marginVertical: Size.OF2}]}>
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
                flex: 1,
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
            <View
              style={{
                height: Size.OF12,
                width: '50%',
                alignSelf: 'flex-end',
                justifyContent: 'center',
                marginVertical: Size.OF2,
                marginHorizontal: Size.OF2,
              }}>
              <Button
                onPressedFunction={() =>
                  set_switch({
                    _personal: false,
                    _social: true,
                    _address: false,
                    _others: false,
                  })
                }
                backColor={Color.red}
                borderColor={Color.red}
                label={'Next'}
                textColor={Color.white}
              />
            </View>
          </View>
        )}
        {_switch._about && (
          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <View
              style={{height: Size.OF35, width: '100%', alignSelf: 'center'}}>
              <View style={[styles.inputContainer, {marginBottom: Size.OF2}]}>
                <Text style={Fontstyle.FONT_SMALL}>Assign Representative</Text>
                <TextInput
                  style={[Fontstyle.FONT_SMALL, styles.input]}
                  returnKeyType="next"
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_addlead._phone}
                  onChangeText={text =>
                    set_addlead({..._addlead, _phone: text})
                  }
                  ref={input => {
                    inputs._phone = input;
                  }}
                  onSubmitEditing={() => {
                    focusNextField('_company');
                  }}
                />
              </View>
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
                      height: Size.OF12,
                      borderRadius: 50,
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
            <View style={{flex: 1, width: '100%', alignSelf: 'center'}}>
              <View style={[styles.inputContainer, {height: Size.OF20}]}>
                <Text style={Fontstyle.FONT_SMALL}>About</Text>
                <TextInput
                  style={[
                    Fontstyle.FONT_SMALL,
                    styles.input,
                    {height: Size.OF12},
                  ]}
                  returnKeyType="next"
                  multiline={true}
                  placeholder={Strings.str_sign_up_place_password}
                  autoCorrect={false}
                  value={_addlead._firstname}
                  onChangeText={text =>
                    set_addlead({..._addlead, _firstname: text})
                  }
                  ref={input => {
                    inputs._firstname = input;
                  }}
                  onSubmitEditing={() => {
                    focusNextField('_lastname');
                  }}
                />
              </View>
              <View
                style={{
                  height: Size.OF12,
                  width: '50%',
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  marginVertical: Size.OF2,
                  marginHorizontal: Size.OF2,
                }}>
                <Button
                  onPressedFunction={() =>
                    set_switch({
                      _personal: false,
                      _social: true,
                      _address: false,
                      _others: false,
                    })
                  }
                  backColor={Color.red}
                  borderColor={Color.red}
                  label={'Next'}
                  textColor={Color.white}
                />
              </View>
            </View>
          </View>
        )}
                {_switch._address && (
          <View style={{flex: 1, width: '90%'}}>
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
                onSubmitEditing={() => {
                  set_switch({
                    _personal: false,
                    _social: true,
                    _address: false,
                    _others: false,
                  })
                }}
              />
            </View>
            <View
              style={{
                height: Size.OF12,
                width: '50%',
                alignSelf: 'flex-end',
                justifyContent: 'center',
                marginHorizontal: Size.OF2,
              }}>
              <Button
                onPressedFunction={() => {}}
                backColor={Color.red}
                borderColor={Color.red}
                label={'Next'}
                textColor={Color.white}
              />
            </View>
          </View>
        )}
      </View>
    </Containerview>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: Size.OF2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Color.white,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  inputContainer: {
    height: Size.OF8,
    flex: 1,
    width: '90%',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    color: Color.gray,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Color.light_gray,
  },
});
export default AddLead;
/**
 *    <Text style={[Fontstyle.FONT_SMALL, {marginVertical: Size.OF2}]}>
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
              <View style={{width: '100%'}}>
                <FlatList
                  horizontal={true}
                  data={_selectedtags}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => deleteNinja(item._id)}
                      style={{
                        marginRight: Size.OF1 / 2,
                        paddingHorizontal: Size.OF3 / 1.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: Size.OF7,
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
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
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
                      paddingHorizontal: Size.OF3 / 1.2,
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
 */