import React from 'react';
import {View, Text} from 'react-native';
import Auth from 'components/auth';
import store from 'store/configureStore';
import {Provider} from 'react-redux';
import AppNavigator from './MainNavigator'
const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
       <AppNavigator></AppNavigator>
      </View>
    </Provider>
  );
};

export default App;

// import React, {useState, useRef} from 'react';
// import {View, Text, TextInput} from 'react-native';
// import Input from '../UI/reusables/Input';

// const App = () => {
//   const [phone_number, set_phone_number] = useState('');
//   const [name, set_name] = useState('');
//   const [name1, set_name1] = useState('');

//   const inputref = useRef(null);
//   const inputref2 = useRef(null);

//   return (
//     <>
//       {/* <TextInput
//         keyboardType="email-address"
//         returnKeyType="next"
//         onSubmitEditing={() => inputref.current.focus()}
//         value={phone_number}
//         onChangeText={text => set_phone_number(text)}
//       /> */}
//       <Input
//         label={'Workspace'}
//         value={phone_number}
//         maxLength={10}
//         autoCorrect={false}
//         returnKeyType="next"
//         onChangeText={text => set_phone_number(text)}
//         onSubmitEditing={() => inputref.current.focus()}
//       />

//       <TextInput
//         ref={inputref}
//         returnKeyType="next"
//         autoCorrect={false}
//         value={name}
//         onChangeText={text => set_name(text)}
//         onSubmitEditing={() => inputref2.current.focus()}
//       />

// <TextInput
//         ref={inputref2}
//         returnKeyType="next"
//         autoCorrect={false}
//         value={name1}
//         onChangeText={text => set_name1(text)}
//       />
//     </>
//   );
// };

// export default App;

// import React, {Component} from 'react';
// import {StyleSheet, TextInput, View, Text} from 'react-native';
// const ref_input2 = React.createRef();
// const ref_input3 = React.createRef();
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <>
//         <TextInput
//           keyboardType="email-address"
//           returnKeyType="next"
//           onSubmitEditing={() => this.passwordRef.focus()}
//           onChangeText={email => this.setState({email})}
//         />

//         <TextInput
//           ref={passwordRef => (this.passwordRef = passwordRef)}
//           returnKeyType="next"
//           autoCorrect={false}
//           onChangeText={password => this.setState({password})}
//           onSubmitEditing={() => this.passwordRef1.focus()}
//         />

//         <TextInput
//           ref={passwordRef1 => (this.passwordRef1 = passwordRef1)}
//           returnKeyType="done"
//           autoCorrect={false}
//           onChangeText={password => this.setState({password})}
//         />
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
