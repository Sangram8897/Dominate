import React from 'react';
import {View, Text} from 'react-native';

import Color from '../styles/Color';
import Fontstyle from '../styles/Fontstyle';

const ErrorMessage = ({errorMessage, errorID}) => {
  return (
    <View>
      <Text style={[Fontstyle.FONT_XSMALL, {color: Color.red}]}>
        {errorMessage}
      </Text>
    </View>
  );
};
export {ErrorMessage};
