/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Containerview from '../../reusables/Containerview';
import Size from '../../styles/Size';
import Color from '../../styles/Color';
import Fontstyle from '../../styles/Fontstyle';
import Moment from 'moment';
import Actions from 'action';

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

  // useEffect(() => {
  //   dispatch(Actions.GET_ALL_LEADS_COUNT());
  // }, [dispatch]);

  return (
    <Containerview>
      <View style={{flex: 1, width: '95%', alignSelf: 'center'}}>
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
            Fontstyle.FONT_XXLARGE,
            {
              marginTop: Platform.OS === 'ios' ? Size.OF2 : Size.OF1,
              color: Color.white,
            },
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
            {marginVertical: Size.OF1, color: Color.white},
          ]}>
          Owned leads
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <FlatList
            data={_items}
            // style={{marginTop:Size.OF2}}
            numColumns={2}
            ListFooterComponent={<View style={{height: Size.OF2}} />}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate(item.nav)}
                style={[
                  styles.block,
                  {
                    flex: 1,
                    margin: Size.OF1,
                    backgroundColor: Color.white,
                    borderRadius: 15,
                    justifyContent: 'center',
                    paddingVertical: Size.OF3,
                    alignItems: 'center',
                  },
                ]}>
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
            )}
            keyExtractor={item => item._name}
          />
        </View>
      </View>
    </Containerview>
  );
};
const styles = StyleSheet.create({
  block:
    Platform.OS === 'ios'
      ? {
          shadowColor: Color.gray,
          shadowOpacity: 1,
          shadowRadius: 5,
        }
      : {
          elevation: 5,
        },
});
export default Home;
