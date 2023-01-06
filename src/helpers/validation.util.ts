const validEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateName = (value: string): string | null => {
  if (value.split(' ').length < 2) {
    return 'Name must be 2 words';
  } else if (value.split(' ').find((word) => word.length < 3) !== undefined) {
    return 'Word must be longer then 2 chars';
  } else {
    return null;
  }
};

export const validatePhoneNumber = (value: string): string | null => {
  if (value?.[0] !== '+') {
    return 'Phone number must be start "+"';
  } else if (String(Number(value)) !== value.replace('+', '')) {
    return 'Phone number must be number';
  } else if (value.length < 10) {
    return 'Phone number must be longer then 8 number';
  } else {
    return null;
  }
};
export const validateDeliveryAddress = (value: string): string | null => {
  if (value.split(' ').length < 3) {
    return 'Address must be 3 words';
  } else if (value.split(' ').find((word) => word.length < 5) !== undefined) {
    return 'Word must be longer then 4 chars';
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
    return 'Card number must be 19 chars';
  } else {
    return null;
  }
};

export const validateExpiration = (value: string): string | null => {
  if (value.length < 5) {
    return 'Expiration must be format mm/yy';
  } else if (Number(value.split('/')[0]) > 12 || Number(value.split('/')[0]) < 1) {
    return 'Month must be less then 13 and higher then 0';
  } else {
    return null;
  }
};
export const validateSecureCode = (value: string): string | null => {
  if (value.length < 3) {
    return 'Secure code must be 3 chars';
  } else {
    return null;
  }
};
