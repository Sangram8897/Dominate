/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import Containerview from '../../reusables/Containerview';
import Size from '../../styles/Size';
import Color from '../../styles/Color';
import Fontstyle from '../../styles/Fontstyle';
import Moment from 'moment';
import Actions from 'actions';

const _items = [
  {
    _name: 'Team',
    src: require('icons/dashboard/abc.png'),
    nav: 'Team',
  },
  {
    _name: 'Customers',
    src: require('icons/dashboard/customer.png'),
    nav: 'Customers',
  },
  {
    _name: 'Reports',
    src: require('icons/dashboard/report.png'),
    nav: 'Reports',
  },
  {
    _name: 'Proposals',
    src: require('icons/dashboard/praposals.png'),
    nav: 'Praposals',
  },
  {
    _name: 'Quotations',
    src: require('icons/dashboard/qutations.png'),
    nav: 'Quatations',
  },
  {
    _name: 'Tasks',
    src: require('icons/dashboard/task.png'),
    nav: 'Task',
  },
];
const Home = props => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  let date = new Date();
  let dateinformat = Moment(date).format('dddd,DD-MMM ');

  useEffect(() => {
    dispatch(Actions.GET_ALL_LEADS_COUNT());
  }, [dispatch]);

  return (
    <Containerview>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <Image
          source={require('icons/app-icon/app2.png')}
          style={{
            height: Size.OF6,
            width: Size.OF20,
            resizeMode: 'contain',
            marginTop: Size.OF2,
          }}
        />
        <Text
          style={[
            Fontstyle.FONT_XLARGE,
            {marginTop: Size.OF1, color: Color.white},
          ]}>
          Hi User
        </Text>
        <Text style={[Fontstyle.FONT_XSMALL, {color: Color.white}]}>
          {dateinformat}
        </Text>
        <Text
          style={[
            Fontstyle.FONT_LARGE_SIMPLE,
            {marginTop: Size.OF1, color: Color.white},
          ]}>
          Upcoming meetings
        </Text>
        <Text
          style={[
            Fontstyle.FONT_LARGE_SIMPLE,
            {marginTop: Size.OF1, color: Color.white},
          ]}>
          Owned leads
        </Text>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {_items.map((item, index) => (
              <TouchableOpacity
                key={item._name}
                onPress={()=>props.navigation.navigate(item.nav)}
                style={{
                  height: Size.OF9 * 2,
                  width: '45%',
                  margin: Size.OF2 / 1.7,
                  backgroundColor: Color.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  elevation: 5,
                }}>
                <Image
                  resizeMode="stretch"
                  source={item.src}
                  style={{
                    width: 50,
                    height: 50,
                    tintColor: Color.primary,
                  }}
                />
                <Text
                  style={[
                    Fontstyle.FONT_MEDIUM_LARGE,
                    {marginTop: Size.OF1, color: Color.primary},
                  ]}>
                  {item._name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Containerview>
  );
};

export default Home;
