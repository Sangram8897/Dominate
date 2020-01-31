import {Component} from 'react';
import {Platform} from 'react-native';
import Strings from 'styles/String';
import IsEmpty from './IsEmpty';

class Validation extends Component {
  trim = txt => {
    return txt.trim();
  };

  emailValidation = email => {
    let isEmpty = IsEmpty(email);
    let valid = Strings.email_validator_string.test(email);
    return {isEmpty, valid};
  };

  phonenumberValidation = number => {
    let isEmpty = IsEmpty(number);
    let valid = Strings.number_validator_string.test(number);
    return {isEmpty, valid};
  };

  numberValidation = number => {
    let isEmpty = IsEmpty(number);
    let valid = !isNaN(number);
    return {isEmpty, valid};
  };
  stringValidation = str => {
    let isEmpty = IsEmpty(str);
    let valid =
      !str.trim() !== '' && Strings.alphabet_validator_string.test(str);
    return {isEmpty, valid};
  };

  // passwordValidation = password => {
  //   return password.length > 0;
  // };

  // pinValidation = pin => {
  //   return pin.length === Message.pin_size;
  // };

  // confirmPinValidation = (pin, confirmPin) => {
  //   return pin === confirmPin;
  // };

  // pinNumericRegex = pin => {
  //   return Message.str_pin_numeric_regex.test(pin);
  // };

  PlatformOS = () => {
    return Platform.OS === 'ios' ? true : false;
  };
}

const validate = new Validation();
export default validate;
