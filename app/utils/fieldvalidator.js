/* eslint-disable no-undef */
import validate from 'utils/validation';
import IsEmpty from './IsEmpty';
export const Is_FieldValid = (
  _type,
  _name,
  _data,
  _msg = 'Please Enter your ',
) => {
  var res;
  switch (_type) {
    case 'NAME': {
      res = validate.stringValidation(_data);
      break;
    }
    case 'NUMBER': {
      res = validate.numberValidation(_data);
      break;
    }
    case 'PHONENUMBER': {
      res = validate.phonenumberValidation(_data);
      break;
    }
    case 'EMAIL': {
      res = validate.emailValidation(_data);
      break;
    }
    case 'PASSWORD': {
      res = validate.passwordValidation(_data);
      if (res.isEmpty) {
        return _msg + _name;
      } else if (!res.valid) {
        _msg = `Please Enter Strong ${_name}`;
        return _msg;
      } else {
        return null;
      }
    }
    default: {
      if (IsEmpty(_data)) {
        return _msg + _name;
      } else {
        return null;
      }
    }
  }
  if (res.isEmpty) {
    return _msg + _name;
  } else if (!res.valid) {
    _msg = `${_msg}valid ${_name}`;
    return _msg;
  } else {
    return null;
  }
};
