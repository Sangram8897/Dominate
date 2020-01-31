import React, {useState, useCallback, useEffect, useRef} from 'react';
import {View, Text,Animated} from 'react-native';
import Containerview from '../../reusables/Containerview';

const Praposals = () => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 5000
    }).start();
  }, []);
  return (
    <Containerview>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
      <Animated.Text style={{ opacity }}>Example text</Animated.Text>
      </View>
    </Containerview>
  );
};

export default Praposals;
