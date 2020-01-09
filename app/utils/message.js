import Snackbar from 'react-native-snackbar';
import {Alert} from 'react-native';
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
