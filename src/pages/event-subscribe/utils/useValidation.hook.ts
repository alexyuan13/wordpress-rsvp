import { useState } from "react";
import {
  INVALID_DISPLAY_NAME_CHARS,
  INVALID_USERNAME_CHARS,
  VALID_DISPLAY_NAME_REQUIRED,
  VALID_EMAIL_REQUIRED,
  VALID_PASSWORD_REQUIRED,
  VALID_USERNAME_REQUIRED,
} from "./errorCodes";
import {
  checkIfValidUsername,
  checkIfSpecialChars,
  checkIfStartWithNumber,
  checkIfValidPassword,
  checkIfValidEmailAddress,
  checkIfValidMobileNumber,
  checkIfValidDisplayname,
} from "./stringValidations";
import shared from "./shared.json";

/**
 * A hook to validate username, password and email address for both mobile and web
 * @returns 
    validateUsername
    validateFirstName,
    validatePassword,
    validateEmail,
    validateMobileNumber,
    setUsernameErrorMessage
    setFirstNameErrorMessage,
    setPasswordErrorMessage,
    setEmailErrorMessage,
    setMobileNumberErrorMessage,
    usernameErrorMessage,
    passwordErrorMessage,
    emailErrorMessage,
    mobileNumberErrorMessage,
 */
export const useValidation = () => {
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [mobileNumberErrorMessage, setMobileNumberErrorMessage] = useState("");

  const validateUsername = (username) => {
    if (checkIfValidUsername(username)) {
      setUsernameErrorMessage("");
      return true;
    } else {
      if (checkIfSpecialChars(username) || checkIfStartWithNumber(username)) {
        setUsernameErrorMessage(shared[INVALID_USERNAME_CHARS]);
      } else {
        setUsernameErrorMessage(shared[VALID_USERNAME_REQUIRED]);
      }
      return false;
    }
  };

  const validateFirstName = (firstName) => {
    if (firstName) return true;
    return false;
  };

  const validateDisplayName = (firstName) => {
    if (checkIfValidDisplayname(firstName)) {
      setDisplayNameErrorMessage("");
      return true;
    } else {
      if (checkIfSpecialChars(firstName) || checkIfStartWithNumber(firstName)) {
        setDisplayNameErrorMessage(shared[INVALID_DISPLAY_NAME_CHARS]);
      } else {
        setDisplayNameErrorMessage(shared[VALID_DISPLAY_NAME_REQUIRED]);
      }
      return false;
    }
  };

  const validateMobileNumber = (mobileNumber) => {
    if (mobileNumber && checkIfValidMobileNumber(mobileNumber)) return true;
    return false;
  };

  const validatePassword = (password) => {
    if (checkIfValidPassword(password)) {
      setPasswordErrorMessage("");
      return true;
    } else {
      setPasswordErrorMessage(shared[VALID_PASSWORD_REQUIRED]);
      return false;
    }
  };

  const validateEmail = (email) => {
    if (checkIfValidEmailAddress(email)) {
      setEmailErrorMessage("");
      return true;
    } else {
      setEmailErrorMessage(shared[VALID_EMAIL_REQUIRED]);
      return false;
    }
  };

  return {
    validateUsername,
    validateFirstName,
    validateDisplayName,
    validatePassword,
    validateEmail,
    validateMobileNumber,
    setUsernameErrorMessage,
    setFirstNameErrorMessage,
    setDisplayNameErrorMessage,
    setPasswordErrorMessage,
    setEmailErrorMessage,
    setMobileNumberErrorMessage,
    usernameErrorMessage,
    firstNameErrorMessage,
    displayNameErrorMessage,
    passwordErrorMessage,
    emailErrorMessage,
    mobileNumberErrorMessage,
  };
};
