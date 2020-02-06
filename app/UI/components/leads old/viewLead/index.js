/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {Picker} from 'native-base';
import Container from 'reusables/Container';
import Containerview from '../../../reusables/Containerview';
import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Fontstyle from '../../../styles/Fontstyle';
import Color from '../../../styles/Color';
import Actions from 'action';
import {search_lead} from './../functions/searctlead';
import {getAllMembers} from '../functions/getAllmembers';
import {getSelectedLead} from './getSelectedLead';
import IsEmpty from '../../../../utils/IsEmpty';
import {setStatusDynamic} from './function';

const ViewLead = props => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [_leads, set_leads] = useState([]);
  const [_info, set_info] = useState([]);
  const [_loading, set_loading] = useState(false);
  const [_status_array, set_status_array] = useState([
    {status: 'New Lead', value: 'NEW_LEAD'},
    {status: 'Qualified Lead', value: 'QUALIFIED_LEADS'},
    {status: 'OnHold Lead', value: 'ON_HOLD'},
    {status: 'Contacted Lead', value: 'CONTACTED_LEADS'},
    {status: 'Opportunity Lead', value: 'OPPORTUNITIES'},
    {status: 'Converted Lead', value: 'CONVERTED'},
  ]);
  const [_assignto_array, set_assignto_array] = useState([]);
  const [_assignto, set_assignto] = useState('');
  const [_status, set_status] = useState('');

  const [_items, set_items] = useState([
    {
      _name: 'SUPER_HOT',
      src: require('icons/leads/superhot.png'),
      value: false,
    },
    {
      _name: 'HOT',
      src: require('icons/leads/hot.png'),
      value: false,
    },
    {
      _name: 'WARM',
      src: require('icons/leads/warm.png'),
      value: false,
    },
    {
      _name: 'COLD',
      src: require('icons/leads/cold.png'),
      value: false,
    },
  ]);

  getData = async () => {
    set_loading(true);
    const name = await props.navigation.state.params.name;

    await getAllMembers()
      .then(res => {
        set_assignto_array(res);
      })
      .catch(() => {
        set_loading(false);
      });

    getSelectedLead(name).then(async res => {
      set_info(res[0]);
      if (!IsEmpty(res[0].assigned)) {
        let assignedname = await res[0].assigned.name;
        set_assignto(assignedname);
      }
      if (!IsEmpty(res[0].degree) && !IsEmpty(res[0].status)) {
        let degree = await res[0].degree;
        let status = await res[0].status;
        setItemSelected(degree);
        setStatus(status);
      }
    });
    set_loading(false);
  };

  setItemSelected = degree => {
    const array = [..._items];
    array.map((item, key) =>
      item._name === degree
        ? (array[key].value = !array[key].value)
        : (array[key].value = false),
    );
    set_items(array);
  };
  setStatus = async status => {
    let _newstatus_ = await _status_array.filter(function(item) {
      return item.value === status;
    });
    set_status(_newstatus_[0].status);
  };
  useEffect(() => {
    getData();
  }, []);

  // getAllMembers().then((res)=>{
  //   set_assignes_accounts(res)
  //   set_assigne(res[0])
  return (
    <Containerview>
      <View
        style={{
          flex: 1,
          width: '92%',
          alignSelf: 'center',
          marginVertical: Size.OF2,
          backgroundColor: Color.white,
          borderRadius: 15,
          elevation: 5,
        }}>
        <Container isLoading={_loading}>
          <ScrollView>
            <View
              style={{
                height: Size.OF17,
                flexDirection: 'row',
                marginHorizontal: Size.OF2,
              }}>
              <Image
                source={require('icons/leads/user.png')}
                style={{
                  height: Size.OF10,
                  width: Size.OF10,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
              />
              <View
                style={{
                  flex: 1,
                  width: '100%',
                }}>
                <Text
                  style={[
                    Fontstyle.FONT_MEDIUM_LARGE,
                    {color: Color.primary, marginTop: Size.OF2},
                  ]}>
                  {!IsEmpty(_info) ? _info.name : ''}
                </Text>
                <Text
                  style={[Fontstyle.FONT_SMALL_SIMPLE, {color: Color.gray}]}
                  numberOfLines={1}>
                  {!IsEmpty(_info) ? _info.email : ''}
                </Text>
                <Text
                  style={[Fontstyle.FONT_SMALL_SIMPLE, {color: Color.gray}]}
                  numberOfLines={1}>
                  Phone : {!IsEmpty(_info) ? _info.phone : ''}
                </Text>
                <Text
                  style={[Fontstyle.FONT_SMALL_SIMPLE, {color: Color.gray}]}
                  numberOfLines={1}>
                  Company : {!IsEmpty(_info) ? _info.company : ''}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: Size.OF8,
                marginHorizontal: Size.OF2,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: '100%',
                  margin: Size.OF1,
                  backgroundColor: Color.white,
                  borderRadius: 5,
                  elevation: 5,
                  backgroundColor: Color.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('icons/leads/call.png')}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: '100%',
                  margin: Size.OF1,
                  backgroundColor: Color.white,
                  borderRadius: 5,
                  elevation: 5,
                  backgroundColor: Color.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('icons/leads/msg.png')}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  flex: 2,
                  margin: Size.OF1,
                  backgroundColor: Color.white,
                  borderRadius: 5,
                  elevation: 5,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    Fontstyle.FONT_SMALL,
                    {marginVertical: Size.OF1, color: Color.gray},
                  ]}>
                  Add FollowUp
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: Size.OF8,
                marginVertical: Size.OF1,
                width: '100%',
                flexDirection: 'row',
              }}>
              {_items.map((item, index) => (
                <TouchableOpacity
                  onPress={async () => {
                    await dispatch(
                      Actions.UPDATE_LEAD_STATUS(_info._id, {
                        degree: item._name,
                      }),
                    ).then(async(res)=>{
                      await getData();
                      dispatch(
                        Actions.STATIC_UPDATE_LEAD_STATUS({
                          ..._info,
                          degree: item._name,
                        }),
                      );
                    });
                    
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: item.value
                      ? Color.transparent_gray
                      : Color.white,
                  }}
                  key={index}>
                  <Image
                    resizeMode="contain"
                    source={item.src}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                flex: 1,
                marginTop: Size.OF2,
                justifyContent: 'space-between',
                height: Size.OF10,
                marginHorizontal: Size.OF2,
              }}>
              <Text style={[Fontstyle.FONT_SMALL]} numberOfLines={1}>
                Status :
              </Text>
              <View
                style={{
                  height: Size.OF6,
                  flex: 1,
                  borderWidth: 0.5,
                  borderColor: Color.gray,
                }}>
                <Picker
                  note
                  mode="dropdown"
                  selectedValue={_status}
                  onValueChange={async itemValue => {
                    let _newstatus_ = await _status_array.filter(function(
                      item,
                    ) {
                      return item.status === itemValue;
                    });
                    dispatch(
                      Actions.UPDATE_LEAD_STATUS(_info._id, {
                        status: _newstatus_[0].value,
                      }),
                    );
                    getData();
                  }}
                  style={{flex: 1, borderWidth: 2, borderColor: 'red'}}>
                  {_status_array.map((x, i) => {
                    return (
                      <Picker.Item label={x.status} key={i} value={x.status} />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: Size.OF2,
                justifyContent: 'space-between',
                height: Size.OF10,
                overflow: 'hidden',
                marginHorizontal: Size.OF2,
              }}>
              <Text style={[Fontstyle.FONT_SMALL]} numberOfLines={1}>
                Assign To :
              </Text>
              <View
                style={{
                  height: Size.OF6,
                  flex: 1,
                  borderWidth: 0.5,
                  borderColor: Color.gray,
                }}>
                <Picker
                  note
                  mode="dropdown"
                  selectedValue={_assignto}
                  onValueChange={itemValue => set_assignto(itemValue)}
                  style={{flex: 1, borderWidth: 2, borderColor: 'red'}}>
                  {_assignto_array.length > 0 &&
                    _assignto_array.map((x, i) => {
                      return (
                        <Picker.Item label={x.name} key={i} value={x.name} />
                      );
                    })}
                </Picker>
              </View>
            </View>
            <View
              style={{
                height: Size.OF7,
                flexDirection: 'row',
                marginVertical: Size.OF2,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginHorizontal: Size.OF1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  backgroundColor: Color.white,
                }}>
                <Text
                  style={[Fontstyle.FONT_SMALL, {color: Color.primary}]}
                  numberOfLines={1}>
                  Archive
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginHorizontal: Size.OF1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  backgroundColor: Color.white,
                }}>
                <Text
                  style={[Fontstyle.FONT_SMALL, {color: Color.primary}]}
                  numberOfLines={1}>
                  Edit Lead
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: Size.OF2}}>
              <Text style={[Fontstyle.FONT_SMALL]} numberOfLines={1}>
                Address Info :
              </Text>
            </View>
          </ScrollView>
        </Container>
      </View>
    </Containerview>
  );
};

export default ViewLead;
