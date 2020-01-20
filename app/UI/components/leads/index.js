import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Containerview from '../../reusables/Containerview';
import Size from '../../styles/Size';
import Strings from '../../styles/String';
import Fontstyle from '../../styles/Fontstyle';
import Color from '../../styles/Color';
import Actions from 'actions';

const Leads = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.GET_ALL_LEADS());
  }, [dispatch]);
  return (
    <Containerview isLoading={false}>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <View
          style={{
            height: Size.OF12,
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[Fontstyle.FONT_XXLARGE, {color: Color.white}]}>
            Leads
          </Text>
        </View>
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
      </View>
    </Containerview>
  );
};

export default Leads;
