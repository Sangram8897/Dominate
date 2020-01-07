import React from 'react';
import {View, Text} from 'react-native';
import Fontstyle from 'styles/Fontstyle';

const Login = () => {
  return (
    <View style={{flex: 1, width: '90%', backgroundColor: 'red'}}>
      <Text style={Fontstyle.FONT_XXSMALL}>Welcome to Login</Text>
    </View>
  );
};

export default Login;
