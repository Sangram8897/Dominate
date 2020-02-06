/* eslint-disable no-undef */
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
import Actions from 'action';

const Leads = () => {
  const [_loading, set_loading] = useState(false);

  getData = async () => {
    set_loading(true);
    console.warn('hellow');
    set_loading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return <Containerview isLoading={_loading} />;
};

export default Leads;
