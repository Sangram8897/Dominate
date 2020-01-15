import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Size from '../styles/Size';
import Fontstyle from '../styles/Fontstyle';
import Color from '../styles/Color';

const Input = props => {
  return (
    <View style={styles.container}>
   
        <Text style={Fontstyle.FONT_SMALL}>{props.label}</Text>
    
     
        <TextInput
          style={[Fontstyle.FONT_SMALL, styles.input]}
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable
          maxLength={40}
        />
     
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: '100%',
    color: Color.gray,
    alignSelf: 'center',
    height: Size.OF3,
    borderBottomWidth: 2,
    borderColor: Color.light_gray,
  },
  container: {
    height: Size.OF10,
    flex: 1,
    width:'90%',
    alignSelf:'center',
    justifyContent:'center',
  },
});
export default Input;
