import Snackbar from 'react-native-snackbar';
import {Alert} from 'react-native';
import {errorMessages} from './ErrorMessages';

export const SnackMessage = _message => {
  Snackbar.show({
    title: _message,
    duration: Snackbar.LENGTH_SHORT,
  });
};
export const NONetworkAlert = () => {
  Alert.alert(
    'Alert!',
    'Please Check your Internet Connection !',
    [{text: 'CLOSE', onPress: () => {}}],
    {
      cancelable: false,
    },
  );
};

export const errorHandler = response => {
  if (response.status) {
    // let _message = errorMessages[response.status].title;
    let _message = errorMessages[response.status].message;
    Alert.alert(
      'Error!',
      _message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }
};