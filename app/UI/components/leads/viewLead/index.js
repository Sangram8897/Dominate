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
import Containerview from '../../../reusables/Containerview';
import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Fontstyle from '../../../styles/Fontstyle';
import Color from '../../../styles/Color';
import Actions from 'actions';
import {search_lead} from './../functions/searctlead';

const ViewLead = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [_leads, set_leads] = useState([]);
  const [_str, set_str] = useState('');


  return (
    <Containerview isLoading={false}>
      <View style={{flex: 1}}>
</View>
    </Containerview>
  );
};

export default ViewLead;
