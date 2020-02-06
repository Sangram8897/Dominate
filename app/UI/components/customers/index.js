import React from 'react';
import {View, Text} from 'react-native';
import Containerview from '../../reusables/Containerview';

const Customers = () => {
  return (
    <Containerview>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <Text>Customers</Text>
      </View>
    </Containerview>
  );
};

export default Customers;
