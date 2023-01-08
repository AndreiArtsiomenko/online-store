const validEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateName = (value: string): string | null => {
  if (value.split(' ').length < 2) {
    return 'The name must contain at least two words';
  } else if (value.split(' ').find((word) => word.length < 3) !== undefined) {
    return 'Each word must be at least 3 characters long';
  } else {
    return null;
  }
};

export const validatePhoneNumber = (value: string): string | null => {
  if (value?.[0] !== '+') {
    return 'Phone number must be start with "+"';
  } else if (String(Number(value)) !== value.replace('+', '')) {
    return 'Phone number must be number';
  } else if (value.length < 10) {
    return 'Phone number must be longer than 8 characters';
  } else {
    return null;
  }
};

export const validateDeliveryAddress = (value: string): string | null => {
  if (value.split(' ').length < 3) {
    return 'The address must contain at least three words';
  } else if (value.split(' ').find((word) => word.length < 5) !== undefined) {
    return 'Each word must be at least 4 characters long';
  } else {
    return null;
  }
};

export const validateEmail = (value: string): string | null => {
  if (!value.match(validEmail)) {
    return 'Email must be "test@test.test"';
  } else {
    return null;
  }
};

export const validateCardNumber = (value: string): string | null => {
  if (value.length < 19) {
    return 'The card number must be 19 characters long.';
  } else {
    return null;
  }
};

export const validateExpiration = (value: string): string | null => {
  if (value.length < 5) {
    return 'The expiry date must be specified in mm/yy format.';
  } else if (Number(value.split('/')[0]) > 12 || Number(value.split('/')[0]) < 1) {
    return 'Month must be less than 13 and greater than 0';
  } else {
    return null;
  }
};

export const validateSecureCode = (value: string): string | null => {
  if (value.length < 3) {
    return 'The security code must be 3 characters long.';
  } else {
    return null;
  }
};
