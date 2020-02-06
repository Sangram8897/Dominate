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

export const addlead_validator = async (
  _addlead,
  _source,
  _selectedtags,
  _other_accounts,
  _assigne,
) => {
  // console.warn(_addlead, _source, _selectedtags, _other_accounts, _assigne);
  let tags = [];
  if (_selectedtags.length > 0) {
    tags = await _selectedtags.map(({_name}) => {
      return _name;
    });
  }
  let source = null;
  let source_ = await _source.filter(item => item.value === true);
  if (source_.length > 0) {
    source = source_[0]._name;
  }

  const data = {
    name: _addlead._firstname + ' ' + _addlead._lastname,
    company: _addlead._company,
    email: _addlead._email,
    phone: _addlead._phone,
    shippingAddress: {
      state: _addlead._state,
      city: _addlead._city,
      pincode: _addlead._pincode,
      website: _addlead._website,
      countryCode: '+91',
    },
    billingAddress: _addlead._address,
    status: 'NEW_LEAD',
    tags: tags,
    assigned: _assigne._id,
    additionalInfo: "{'sdsd':'sdsd'}",
    profileImage: 'https://xyz.com',
    about: _addlead._about,
    degree: 'COLD',
    media: _other_accounts,
    worth: _addlead._worth,
    source: source,
    isKanban: false,
    isHidden: false,
  };

  return data;
  // "name":"sangram gkxfghjxjy",
  // "company":"",
  // "email":"sangram8897@gmail.com",
  // "phone":"+919021010551",
  // "shippingAddress":{
  //   "state":"Maharashtra",
  //   "city":"pune",
  //   "pincode":"411024",
  //   "website":"pune",
  //   "countryCode":"+91"},
  // "billingAddress":"karve nagarg, lane no 4,pune",
  // "status":"NEW_LEAD",
  // "tags":[],
  // "assigned":"57324830-40db-11ea-93cb-a53ed7aa2a18",
  // "additionalInfo":"{'sdsd':'sdsd'}",
  // "profileImage":"https://xyz.com",
  // "about":"adasd","degree":"COLD",
  // "media":{"facebook":"","linkedIn":"","instagram":"","other":""},
  // "worth":"30000",
  // "source":null,
  // "isKanban":false,
  // "isHidden":false
};
