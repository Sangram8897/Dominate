/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Containerview from '../../reusables/Containerview';
import Size from '../../styles/Size';
import Color from '../../styles/Color';
import Fontstyle from '../../styles/Fontstyle';
import Actions from 'action';
import IsEmpty from '../../../utils/IsEmpty';

const SearchLead = props => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const _searchref = useRef(null);
  const [_datacontainer, set_datacontainer] = useState([]);
  const [_searchtext, set_searchtext] = useState('');
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
  useEffect(() => {
    _searchref.current.focus();
  })
  

  load_leads = text => {
    if (!IsEmpty(text)) {
      let query_data = {
        query: {
          name: {
            $regex: `^${text}`,
          },
        },
      };
      dispatch(Actions.SEARCH_LEADS(query_data, onload_SUCCESS));
    }
    set_searchtext(text);
  };
  onload_SUCCESS = data => {
    set_datacontainer(data);
  };

  return (
    <Containerview>
      <View style={{flex: 1, width: '100%'}}>
        <TouchableOpacity
          style={{
            height: Size.OF7,
            borderRadius: 25,
            margin: Size.OF2,
            backgroundColor: Color.white,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: Size.OF1,
            flexDirection: 'row',
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
          <TextInput
            style={[
              Fontstyle.FONT_SMALL,
              {
                flex: 1,
              },
            ]}
            ref={_searchref}
            multiline={true}
            autoCorrect={false}
            value={_searchtext}
            onChangeText={text => load_leads(text)}
          />
        </TouchableOpacity>
        <FlatList
          style={{flex: 1}}
          data={_datacontainer}
          renderItem={({item}) => (
            <View
              style={{
                height: Size.OF25,
                marginVertical: Size.OF1,
                width: '87%',
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
          onEndReachedThreshold={0.3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Containerview>
  );
};

export default SearchLead;
