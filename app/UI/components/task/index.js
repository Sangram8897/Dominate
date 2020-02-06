import React from 'react';
import {View, Text} from 'react-native';
import Containerview from '../../reusables/Containerview';

const Task = () => {
  return (
    <Containerview>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <Text>Task</Text>
      </View>
    </Containerview>
  );
};

export default Task;
