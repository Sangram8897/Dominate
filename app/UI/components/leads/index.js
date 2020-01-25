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
  TextInput,
  ScrollView,
} from 'react-native';
import Containerview from '../../reusables/Containerview';
import Size from '../../styles/Size';
import Strings from '../../styles/String';
import Fontstyle from '../../styles/Fontstyle';
import Color from '../../styles/Color';
import Actions from 'actions';
import {search_lead} from './functions/searctlead';
import {url} from 'config';

const _items = [
  {
    _name: 'Team',
    src: require('icons/leads/superhot.png'),
    des: 'Regarding Mobile Application',
  },
  {
    _name: 'Customers',
    src: require('icons/leads/hot.png'),
    des: 'Regarding web project,Application deadline date',
  },
  {
    _name: 'Reports',
    src: require('icons/leads/warm.png'),
    des: 'Regarding new web project',
  },
  {
    _name: 'Proposals',
    src: require('icons/leads/cold.png'),
    des: 'Regarding delay in deadlines',
  },
];
const Leads = props => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [_leads, set_leads] = useState([]);
  const [_str, set_str] = useState('');

  useEffect(() => {
    dispatch(Actions.GET_ALL_LEADS());
  }, [dispatch]);

  const leads_data = useSelector(state => state.LeadsData.leads);
  useEffect(() => {
    if (leads_data != null) {
      console.warn(leads_data);
      set_leads(leads_data);
    }
  }, [leads_data]);
  filterData = text => {};
  return (
    <Containerview isLoading={false}>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              height: Size.OF12,
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                Fontstyle.FONT_XXLARGE,
                {color: Color.white, marginLeft: Size.OF2},
              ]}>
              Leads
            </Text>
          </View>
          <Text
            style={[
              Fontstyle.FONT_LARGE_SIMPLE,
              {marginTop: Size.OF1, color: Color.white, marginLeft: Size.OF2},
            ]}>
            Upcoming meetings
          </Text>
          <Text
            style={[
              Fontstyle.FONT_LARGE_SIMPLE,
              {
                marginVertical: Size.OF1,
                marginLeft: Size.OF2,
                color: Color.white,
              },
            ]}>
            Owned leads
          </Text>
          <View
            style={{
              height: Size.OF7,
              elevation: 10,
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              paddingHorizontal: '3%',
              width: '95%',
              backgroundColor: Color.white,
            }}>
            <Image
              resizeMode="contain"
              source={require('icons/symbols/search.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: Color.gray,
              }}
            />
            <TextInput
              placeholderTextColor={Color.gray}
              autoCorrect={false}
              style={[Fontstyle.FONT_SMALL, {flex: 1, paddingLeft: '3%'}]}
              returnKeyType="done"
              placeholder={'Search Lead....'}
              keyboardType={'default'}
              blurOnSubmit={true}
              value={_str}
              onChangeText={text => search_lead(text)}
            />
          </View>
          {_leads &&
            _leads.map((item, index) => (
              <View
                key={item._id}
                style={{
                  height: Size.OF25,
                  marginVertical: Size.OF1,
                  width: '92%',
                  alignSelf: 'center',
                  backgroundColor: Color.white,
                  elevation: 5,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                <View style={{flex: 1.3, width: '100%', flexDirection: 'row'}}>
                  <View style={{flex: 1.2, width: '100%',justifyContent:'center',alignItems:'center'}}>
                    
                      <Image
                        source={require('icons/leads/user.png')}
                        style={{
                          height:Size.OF10,
                          width: Size.OF10,
                          resizeMode: 'cover',
                          borderRadius: 20,
                        }}
                      />
                    
                  </View>
                  <View
                    style={{
                      flex: 3,
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}>
                    <Text
                      style={[
                        Fontstyle.FONT_MEDIUM_LARGE,
                        {color: Color.primary},
                      ]}>
                      {item.name}
                    </Text>
                    <Text
                      style={[Fontstyle.FONT_SMALL_SIMPLE, {color: Color.gray}]}
                      numberOfLines={1}>
                      {item.email}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('icons/leads/notes.png')}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
                  {_items.map((item, index) => (
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        marginHorizontal: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
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
                    marginHorizontal: Size.OF1,
                    marginBottom: '1%',
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
                        Fontstyle.FONT_MEDIUM_SIMPLE,
                        {marginVertical: Size.OF1, color: Color.gray},
                      ]}>
                      View Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddLead')}
          style={{
            position: 'absolute',
            backgroundColor: '#FF5757',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            height: 55,
            width: 55,
            bottom: 20,
            right: 20,
            borderRadius: 30,
            elevation: 10,
            //   shadowColor: 'red',shadowOpacity: 0.26,shadowOffset:{width:0,height:2},shadowRadius:10,
          }}>
          {/* <Image
            source={require('../../../assets/icons/symbols/')}
            style={{height: Size.of40, width: Size.of40}}
          /> */}
        </TouchableOpacity>
      </View>
    </Containerview>
  );
};

export default Leads;
/**
 *   <FlatList
              style={{flex: 1}}
              data={_leads}
              renderItem={({item}) => (
                <View
                  style={{
                    height: Size.OF25,
                    marginVertical: Size.OF1,
                    width: '92%',
                    alignSelf: 'center',
                    backgroundColor: Color.white,
                    elevation: 5,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{flex: 1.3, width: '100%', flexDirection: 'row'}}>
                    <View style={{flex: 1.2, width: '100%'}} />
                    <View
                      style={{
                        flex: 3,
                        width: '100%',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={[
                          Fontstyle.FONT_MEDIUM_LARGE,
                          {color: Color.primary},
                        ]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          Fontstyle.FONT_SMALL_SIMPLE,
                          {color: Color.gray},
                        ]}
                        numberOfLines={1}>
                        {item.email}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('icons/leads/notes.png')}
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
                    {_items.map((item, index) => (
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          marginHorizontal: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
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
                      marginHorizontal: Size.OF1,
                      marginBottom: '1%',
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
                          Fontstyle.FONT_MEDIUM_SIMPLE,
                          {marginVertical: Size.OF1, color: Color.gray},
                        ]}>
                        View Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
 */
