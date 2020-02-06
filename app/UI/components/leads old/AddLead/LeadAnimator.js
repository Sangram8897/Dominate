/* eslint-disable no-undef */
// import React, {Component} from 'react';
// import {Text, View, Animated, Dimensions} from 'react-native';

// const dimen = Dimensions.get('window').height;
// export default class LeadAnimator extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       viewSize: false,
//     };
//     this.animatedValue = new Animated.Value(0);
//   }
//   componentDidMount() {
//     this.animate();
//   }
//   animate = () => {
//     Animated.timing(this.animatedValue, {
//       toValue: this.state.viewSize ? 0 : 1,
//       duration: 1000,
//     }).start();
//     this.setState({
//       viewSize: !this.state.viewSize,
//     });
//   };

//   render() {
//     return (
//       <View style={{height: dimen, width: '100%',justifyContent:'flex-end'}}>
//         <Animated.View
//           style={{
//             height: this.animatedValue.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, dimen],
//             }),
//             backgroundColor: 'pink',
//             width: '95%',
//             alignSelf: 'center',
//             flexDirection: 'row',
//           }}
//         />
//       </View>
//     );
//   }
// }
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Text, View, Animated, Dimensions} from 'react-native';
import useBackHandler from 'hooks/useBackHandler';
import AddLead from '.';
import Containerview from '../../../reusables/Containerview';
const dimen = Dimensions.get('window').height;
const dimenwidth = Dimensions.get('window').width;
let timer;
const LeadAnimator = props => {
  const [animatedValue, setanimatedValue] = useState(new Animated.Value(0));
  const [viewSize, setviewSize] = useState(false);
  useEffect(() => animate(), []);

//   useBackHandler(async () => {
//     await animate();
//     timer = setTimeout(async () => {
//       props.navigation.goBack();
//       clearTimeout(timer);
//       return true;
//     }, 100);
//   });

  animate = () => {
    Animated.timing(animatedValue, {
      toValue: viewSize ? 0 : 1,
      duration: 200,
    }).start();
    setviewSize(!viewSize);
  };
  return (
    <Containerview isLoading={false}>
        <View style={{flex:1,alignItems:'flex-end',width:'100%'}}>
      <Animated.View
        style={{
          height: dimen,
          left: 0,
          width: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, dimenwidth],
          }),
        }}>
        <AddLead {...props} />
      </Animated.View>
      </View>
      </Containerview>
  );
};

export default LeadAnimator;
