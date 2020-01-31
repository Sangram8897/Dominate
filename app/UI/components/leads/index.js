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
  Animated,
  Modal,
} from 'react-native';
import Containerview from '../../reusables/Containerview';
import Size from '../../styles/Size';
import Strings from '../../styles/String';
import Fontstyle from '../../styles/Fontstyle';
import Color from '../../styles/Color';
import Actions from 'actions';
import {search_lead} from './functions/searctlead';
import {url} from 'config';
import Container from 'reusables/Container';
import IsEmpty from '../../../utils/IsEmpty';
import FilterModal from './FilterModal';

const _filters = [
  {
    _name: 'All',
    des: 'ALL',
  },
  {
    _name: 'SuperHot',
    des: 'SUPER_HOT',
  },
  {
    _name: 'Hot',
    des: 'HOT',
  },
  {
    _name: 'Warm',
    des: 'WARM',
  },
  {
    _name: 'Cold',
    des: 'COLD',
  },
];

const HEADER_HEIGHT = Size.OF15;

const Leads = props => {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = new Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const headerHeight = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const [_loading, set_loading] = useState(false);
  const [_category, set_category] = useState('All');
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
  const [_leads, set_leads] = useState([]);
  const [_str, set_str] = useState('');
  const [_pageno, set_pageno] = useState(1);
  const [_filtervisible, set_filtervisible] = useState(false);

  getData = async () => {
    set_loading(true);
    await dispatch(Actions.GET_ALL_LEADS(_pageno)).then(res => {});
    set_loading(false);
  };

  loadMoreData = async () => {
    set_loading(true);
    let _moreleads = await dispatch(
      Actions.LOAD_MORE_LEADS(_pageno, _category),
    );
    if (_moreleads.length > 0) {
      dispatch(Actions.UPDATE_MORE_LEADS([..._leads, ..._moreleads]));
    }
    if (IsEmpty(_moreleads) || _moreleads.length < 10) {
      set_pageno(null);
    }
    set_loading(false);
  };

  useEffect(() => {
    loadMoreData();
  }, [_pageno, _category]);

  const leads_data = useSelector(state => state.LeadsData.leads);
  useEffect(() => {
    if (leads_data != null) {
      set_leads(leads_data);
    }
  }, [leads_data]);
  filterData = text => {};

  closeFilter=()=>{
    set_filtervisible(false)
  }

  return (
    <Container isLoading={_loading}>
      <View style={{flex: 1, width: '100%'}}>
      <Modal
          transparent={true}
          visible={_filtervisible}
          animationType={'slide'}
          presentationStyle={'overFullScreen'}
          onRequestClose={()=>set_filtervisible(false)}>
        <FilterModal closeFilter={closeFilter}></FilterModal>
        </Modal>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: Color.primary,
            height: HEADER_HEIGHT,
            zIndex: 1,
            justifyContent: 'center',
            paddingVertical: Size.OF1,
            paddingHorizontal: Size.OF2,
            transform: [{translateY: headerHeight}],
          }}>
          <View
            style={{
              flex: 1.2,
              overflow: 'hidden',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[Fontstyle.FONT_XLARGE, {color: Color.white}]}>
              Leads
            </Text>
            <View style={{flexDirection: 'row',alignItems:'center', overflow: 'hidden'}}>
            <TouchableOpacity
                style={{
                  height: Size.OF5,
                  width: Size.OF5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.white,
                  borderRadius: 25,
                }}>
                <Image
                  source={require('icons/symbols/search.png')}
                  style={{
                    padding: Size.OF1,
                    height: Size.OF4,
                    width: Size.OF4,
                    resizeMode: 'contain',
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: Size.OF7,
                  width: Size.OF7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('icons/symbols/notification.png')}
                  style={{
                    height: Size.OF6,
                    width: Size.OF6,
                    resizeMode: 'contain',
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{height: Size.OF7, width: Size.OF7}}>
                <Image
                  source={require('icons/leads/user.png')}
                  style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: 'cover',
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: Size.OF1,
              overflow: 'hidden',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={[Fontstyle.FONT_LARGE_SIMPLE, {color: Color.white}]}>
              211 Total Leads
            </Text>
            <TouchableOpacity
            onPress={()=>set_filtervisible(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color.white,
                borderRadius: 5,
                paddingHorizontal: Size.OF1,
              }}>
                <Image
                  source={require('icons/symbols/filter.png')}
                  style={{
                    height: Size.OF2,
                    width: Size.OF2,
                    resizeMode: 'cover',
                    borderRadius: 20,
                  }}
                />
            <Text style={[Fontstyle.FONT_SMALL_SIMPLE, {marginLeft:Size.OF1,color:Color.gray}]}>
              Filter
            </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        {_leads.length > 0 ? (
          <FlatList
            style={{flex: 1}}
            data={_leads}
            showsVerticalScrollIndicator={false}
            style={{paddingVertical: HEADER_HEIGHT}}
            bounces={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: scrollY}}},
            ])}
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
                <View style={{flex: 1.3, width: '100%', flexDirection: 'row'}}>
                  <View style={{flex: 1.2, width: '100%'}}>
                    <Image
                      source={require('icons/leads/user.png')}
                      style={{
                        height: Size.OF10,
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
                <View
                  style={{
                    flex: 1,
                    marginTop: Size.OF1,
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  {_items.map((item2, index) => (
                    <TouchableOpacity
                      onPress={async () => {
                        set_loading(true);
                        await dispatch(
                          Actions.UPDATE_LEAD_STATUS(item._id, {
                            degree: item2._name,
                          }),
                        ).then(res => {
                          if (res.SUCCESS) {
                            dispatch(
                              Actions.STATIC_UPDATE_LEAD_STATUS({
                                ...item,
                                degree: item2._name,
                              }),
                            );
                          }
                        });
                        set_loading(false);
                      }}
                      style={{
                        flex: 1,
                        marginHorizontal: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:
                          item2._name == item.degree
                            ? Color.transparent_gray
                            : Color.white,
                      }}
                      key={index}>
                      <Image
                        resizeMode="contain"
                        source={item2.src}
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
                    onPress={() =>
                      props.navigation.navigate('ViewLead', {name: item.name})
                    }
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
            onEndReached={async () => {
              if (!IsEmpty(_pageno)) {
                set_pageno(_pageno + 1);
              }
            }}
            onEndReachedThreshold={0.3}
            ListFooterComponent={() => (
              <TouchableOpacity
                onPress={async () => {
                  if (!IsEmpty(_pageno)) {
                    set_pageno(_pageno + 1);
                  }
                }}
                style={{
                  //backgroundColor:'#EFC66A',
                  marginBottom: HEADER_HEIGHT + Size.OF1,
                  width: '80%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Text
                    style={[
                      Fontstyle.FONT_MEDIUM_SIMPLE,
                      {marginVertical: Size.OF1, color: Color.gray},
                    ]}>
                    Load more.....
                  </Text> */}
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              marginTop: HEADER_HEIGHT,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('icons/msgicons/cloud.png')}
              style={{
                width: Size.OF10,
                height: Size.OF10,
              }}
            />
            <Text
              style={[
                Fontstyle.FONT_LARGE_SIMPLE,
                {color: Color.gray, marginTop: Size.OF2},
              ]}>
              No Leads Found
            </Text>
          </View>
        )}

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
    </Container>
  );
};
export default Leads;
/**
 *           <View
            style={{
              height: Size.OF6,
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
          <ScrollView horizontal={true}>
            {_filters.map((item, index) => (
              <TouchableOpacity
                key={item._name}
                onPress={() => {
                  console.warn(item.des)
                  set_leads([]);
                  set_category(item.des);
                  set_pageno(1);
                }}
                style={{
                  marginVertical: Size.OF1,
                  marginHorizontal: Size.OF1,
                  height: Size.OF5,
                  backgroundColor: Color.white,
                  justifyContent: 'center',
                  paddingHorizontal: Size.OF2,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Color.gray,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[Fontstyle.FONT_SMALL, {color: Color.gray}]}>
                  {item._name}
                </Text>
                <View
                  style={{
                    height: '50%',
                    width: 1,
                    backgroundColor: Color.light_gray,
                    marginHorizontal: Size.OF1,
                  }}
                />
                <Text style={[Fontstyle.FONT_SMALL]}>215</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
 */
