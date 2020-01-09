import React, {Component} from 'react';
import {
  View,
  Text,
  NetInfo,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import Size from '../styles/Size';
import Color from '../styles/Color';
import Fontstyle from '../styles/Fontstyle';
const screenHeight = Dimensions.get('window').height;

export default class NoInternetBar extends Component {
  state = {
    isConnected: true,
    shakedValue: new Animated.Value(0),
  };

  get animatedStyle() {
    return {
      transform: [
        {
          translateX: this.state.shakedValue.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 4, -6, 8, -8, 6, -6, 8, -8, 4, 0],
          }),
        },
      ],
    };
  }

  shakeAnimation = () => {
    this.state.shakedValue.setValue(0);
    Animated.spring(this.state.shakedValue, {
      toValue: 1,
      friction: 3,
      tension: 2,
      useNativeDriver: true,
    }).start(() => this.state.shakedValue.setValue(0));
  };
  componentDidMount() {
    this.shakeAnimation();
  }
  render() {
    return (
      <Animated.View style={[styles.strip, this.animatedStyle]}>
        <Text style={[Fontstyle.FONT_SMALL,{color:Color.red}]}>No Internet Connection</Text>
      </Animated.View>
    );
  }
}
const styles = {
  strip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'ios' && screenHeight === 812 ? Size.OF7 : Size.OF6, //iPhone X
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};
