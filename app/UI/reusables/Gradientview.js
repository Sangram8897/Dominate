import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Gradientview = props => {
  return (
    <LinearGradient
      colors={props.colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {props.children}
    </LinearGradient>
  );
};

export default Gradientview;
