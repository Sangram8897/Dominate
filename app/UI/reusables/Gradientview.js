import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Gradientview = props => {
  return (
    <LinearGradient
      colors={['#2828F2', '#0C3CBF', '#0C3CBF', '#4609D0']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {props.children}
    </LinearGradient>
  );
};

export default Gradientview;
