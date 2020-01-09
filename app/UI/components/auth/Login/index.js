// import React, {useState, useCallback, useEffect} from 'react';
// import {View, Text} from 'react-native';
// import Input from '../../reusables/Input';

// import Size from '../../styles/Size';
// import Strings from '../../styles/String';
// import Color from '../../styles/Color';
// import Button from '../../reusables/Button';
// import Fontstyle from '../../styles/Fontstyle';

// const Login = () => {
//   const [_workspace, set_workspace] = useState('');
//   const [_eamail, set_eamail] = useState('');
//   const [_password, set_password] = useState('');

//   login = async () => {};

//   return (
//     <View style={{flex: 1}}>
//       <Input
//         label={'Workspace'}
//         value={_workspace}
//         onChangeText={text => set_workspace(text)}
//         maxLength={10}
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
//       <Input
//         label={'Email'}
//         value={_eamail}
//         onChangeText={text => set_eamail(text)}
//         maxLength={10}
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
//       <Input
//         label={'Password'}
//         value={_password}
//         onChangeText={text => set_password(text)}
//         maxLength={10}
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
//       <View
//         style={{
//           height: Size.OF8,
//           width: '90%',
//           alignSelf: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text
//           style={[
//             Fontstyle.FONT_SMALL,
//             {
//               color: Color.primary,
//             },
//           ]}>
//           {Strings.str_forgot_password}
//         </Text>
//       </View>
//       <View
//         style={{
//           height: Size.OF10,
//           width: '50%',
//           alignSelf: 'center',
//           justifyContent: 'center',
//         }}>
//         <Button
//           onPressedFunction={() => {}}
//           backColor={Color.primary2}
//           borderColor={Color.primary2}
//           label={Strings.str_sign_in}
//           textColor={Color.white}
//         />
//       </View>
//     </View>
//   );
// };

// export default Login;



//akshaynagargoje0716@gmail.com
//123456
//domain100
import React, {useState, useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import Input from '../../../reusables/Input';

import Size from '../../../styles/Size';
import Strings from '../../../styles/String';
import Color from '../../../styles/Color';
import Button from '../../../reusables/Button';
import Fontstyle from '../../../styles/Fontstyle';

const Login = () => {
  const [_workspace, set_workspace] = useState('');
  const [_email, set_email] = useState('');
  const [_password, set_password] = useState('');

  login = async () => {
    console.warn(_workspace, _email, _password);
  };

  return (
    <View style={{flex: 1}}>
      <Input
        label={'Workspace'}
        value={_workspace}
        onChangeText={text => set_workspace(text)}
        maxLength={10}
        autoCorrect={false}
      />
      <Input
        label={'Email'}
        value={_email}
        onChangeText={text => set_email(text)}
        maxLength={10}
        autoCorrect={false}
      />
      <Input
        label={'Password'}
        value={_password}
        onChangeText={text => set_password(text)}
        maxLength={10}
        secureTextEntry={true}
        autoCorrect={false}
      />
      <View
        style={{
          height: Size.OF8,
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            Fontstyle.FONT_SMALL,
            {
              color: Color.primary,
            },
          ]}>
          {Strings.str_forgot_password}
        </Text>
      </View>
      <View
        style={{
          height: Size.OF10,
          width: '50%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPressedFunction={() => {
            login();
          }}
          backColor={Color.primary2}
          borderColor={Color.primary2}
          label={Strings.str_sign_in}
          textColor={Color.white}
        />
      </View>
    </View>
  );
};

export default Login;

 