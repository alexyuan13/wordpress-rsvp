export const checkIfValidEmailAddress = (text) => {
  return new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}').test(text);
};

export const checkIfValidPassword = (text) => {
  return new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9#?!@$%^&*-]).{8,}$').test(text);
};

export const checkIfValidUsername = (text) => {
  return new RegExp('^(?=[a-zA-Z][a-zA-Z0-9._]{3,29}$)(?!.*[_.]{2})[^_.].*[^_.]$').test(text);
};

export const checkIfValidDisplayname = (text) => {
  return new RegExp('^(?=[a-zA-Z][a-zA-Z0-9._ ]{3,29}$)(?!.*[_.]{2})[^_.].*[^_.]$').test(text);
};

export const isInAllowedRange = ({ text = '', range = { min: 4, max: 20 } }) => {
  const { min, max } = range;
  return new RegExp(`^.{${min},${max}}$`).test(text);
};

export const checkIfSpecialChars = (text) => {
  return new RegExp(`[^A-Za-z0-9]`).test(text); // negation of Alpha numeric is special chars
};

export const checkIfStartWithNumber = (text) => {
  return new RegExp(`^\\d`).test(text);
};

export const checkIfValidMobileNumber = (text) => {
  return new RegExp(`^(61)(0\\d{9}|4\\d{8})|(64)(0\\d{9}|2\\d{7,9})$`).test(text);
};
