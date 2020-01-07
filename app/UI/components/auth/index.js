import React from 'react';
import {View, Text} from 'react-native';
import Fontstyle from 'styles/Fontstyle';

const Auth = () => {
  return (
    <View style={{flex: 1, width: '90%', backgroundColor: 'white'}}>
      <Text style={Fontstyle.FONT_XXSMALL}>Welcome to Login</Text>
    </View>
  );
};

export default Auth;
