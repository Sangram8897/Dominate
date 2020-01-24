/* eslint-disable no-undef */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {View, Text, TextInput} from 'react-native';
import Containerview from '../../reusables/Containerview';

const Team = () => {
  const [inputs, set_inputs] = useState({});
  focusNextField = id => {
    inputs[id].focus();
  };

  setRef = (id, input) => {
    inputs[id] = input;
  };
  
  return (
    <Containerview>
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <Text>Team</Text>
        <TextInput
          style={{backgroundColor: 'red'}}
          ref={input => {
            inputs.name = input;
          }}
          onSubmitEditing={() => {
            focusNextField('name2');
          }}
        />
        <TextInput
          style={{backgroundColor: 'red', marginVertical: 20}}
          ref={input => {
            inputs.name2 = input;
          }}
          onSubmitEditing={() => {
            focusNextField('name3');
          }}
        />
        <TextInput
          style={{backgroundColor: 'red', marginVertical: 20}}
          ref={input => {
            inputs.name3 = input;
          }}
        />
      </View>
    </Containerview>
  );
};

export default Team;
