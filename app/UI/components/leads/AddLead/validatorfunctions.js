import validate from 'utils/validation';
import IsEmpty from '../../../../utils/IsEmpty';

export const persolInfo_validator = async data => {
  let errors = {};
  let email_error = validate.emailValidation(data._email);
  if (email_error.isEmpty) {
    errors._email = 'please enter your email address';
  } else {
    if (!email_error.valid) {
      errors._email = 'please enter valid email address';
    }
  }

  let firstname_error = validate.stringValidation(data._firstname);
  if (firstname_error.isEmpty) {
    errors._firstname = 'enter firstname';
  } else {
    if (!firstname_error.valid) {
      errors._firstname = 'enter valid firstname';
    }
  }

  let lastname_error = validate.stringValidation(data._lastname);
  if (lastname_error.isEmpty) {
    errors._lastname = 'enter lastname';
  } else {
    if (!lastname_error.valid) {
      errors._lastname = 'enter valid lastname';
    }
  }

  let phone_error = validate.phonenumberValidation(data._phone);
  if (phone_error.isEmpty) {
    errors._phone = 'please enter your phone number';
  } else {
    if (!phone_error.valid) {
      errors._phone = 'please enter valid phone number';
    }
  }

  if (IsEmpty(data._company)) {
    errors._company = 'please enter your company name';
  }

  let worth_error = validate.numberValidation(data._worth);
  if (worth_error.isEmpty) {
    errors._worth = 'please enter your worth Amount';
  } else {
    if (!worth_error.valid) {
      errors._worth = 'please enter valid worth Amount';
    }
  }
  if (!IsEmpty(errors)) {
    throw errors;
  }
};
