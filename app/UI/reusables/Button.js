import React, {useState, useCallback, useEffect} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Fontstyle from './../styles/Fontstyle';
import Size from '../styles/Size';
const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPressedFunction}
      style={{
        height: Size.OF7,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.backColor,
        borderWidth: 2,
        borderRadius: 40,
        borderColor: props.borderColor,
      }}>
      <Text style={[Fontstyle.FONT_MEDIUM, {color: props.textColor}]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
