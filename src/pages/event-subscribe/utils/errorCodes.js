/**
 * List of codes for validation
 * kebab-case strings are server side
 * camelCase strings are client side (Lokalise)
 *
 * Documentation: https://app.asana.com/0/1200850442945805/1201291229061007/f
 */

export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

/**
 * Action/User
 */
export const INVALID_USER = 'invalid-user';
export const USER_DELETED = 'user-deleted';
export const USER_LOCKED = 'user-locked';

/**
 * Chat/Contacts
 */
export const CONTACT_NOT_EXIST = 'contact-not-exist';
export const CONTACT_STILL_ACTIVE = 'contact-still-active';
export const INVALID_CONTACT = 'invalid-contact';
export const INVALID_CONTACT_ID = 'invalid-contactid';
export const INVALID_MESSAGE_CONTENT = 'invalid-message-content';
export const INVALID_PARAMETER = 'invalid-parameter';
export const INVALID_PHOTO_PARAMETER = 'invalid-photo-parameter';

/**
 * Internal Review
 */
export const INTERNAL_REVIEW_EXISTS = 'internal-review-exists';

/**
 * Photo
 */
export const INVALID_PHOTO_FOLDER = 'invalid-photo-folder';
export const PHOTO_NOT_FOUND = 'photo-not-found';
export const PHOTO_NOT_SUITABLE = 'photo-not-suitable';

/**
 * Search
 */
export const EMPTY_SEARCH_NAME = 'empty-search-name';
export const USER_SEARCH_ID_NOT_FOUND = 'user-search-id-not-found';

/**
 * Subscription
 */
export const USER_NO_STAMP = 'user-no-stamp';
export const USER_NOT_SUBSCRIBED = 'user-not-subscribed';

/**
 * User
 */
export const AUTHORISATION_FAILED = 'authorisation-failed';
export const SEEKING_GENDER_TYPES_CANNOT_BE_EMPTY = 'seekingGenderTypes-can-not-be-empty';
export const USER_NOT_EXIST = 'user-not-exist';
export const VERIFY_FAILED = 'verify-failed';

/**
 * User
 */
export const INVALID_USER_ID = 'invalid-user-id';

/**
 * Wink
 */
export const WINK_ACCESS_DENIED = 'wink-access-denied';

/**
 * Login
 */
export const INVALID_LOGIN = { message: AUTHORISATION_FAILED, key: 'invalidLoginValidation' };
export const INVALID_ACCOUNT = { message: 'inactive-account', key: 'accountInactiveValidation' };
export const TOO_MANY_LOGIN_ATTEMPTS = { message: 'too-many-login-attempts', key: 'tooManyTriesValidation' };
export const INVALID_AUTH_TOKEN = 'invalid-authtoken';
export const INCOMPLETE_USER_STATUS = 'incomplete';
export const LOCKED_USER_STATUS = 'locked-account';
export const QUARANTINED_USER_STATUS = 'quarantined-account';
export const MOBILE_NOT_REGISTERED = { message: 'invalidLoginValidation', key: 'mobile-not-registered' };

/**
 * Reset Password
 */
export const INVALID_RESET_TOKEN = { message: 'invalid-reset-token', key: 'invalidResetValidation' };
export const EXPIRED_RESET_TOKEN = { message: 'expired-reset-token', key: 'resetRequestExpiredValidation' };
export const PASSWORD_MISMATCH_VALIDATION = 'passwordMismatchValidation';

/**
 * Join
 */
export const VALID_EMAIL_REQUIRED = 'emailValidation';
export const VALID_PASSWORD_REQUIRED = 'passwordValidation';
export const EMAIL_ALREADY_USED = { message: 'email-already-used', key: 'emailAlreadyUsed' };
export const EMAIL_VERIFICATION_FAILED = VERIFY_FAILED;
export const EMAIL_FAILURE = 'email-failure';
export const BAD_USER_INPUT = 'BAD_USER_INPUT';
export const MOBILE_ALREADY_USED = 'mobile-already-used';

/**
 * Join Verify Code
 */
export const TOO_FREQUENT = 'too-frequent';
export const REACH_MAXIMUM = 'reach-maximum';

/**
 * Get Started
 */
export const INVALID_AGE = 'ageValidation';
export const INVALID_AGE_OVER = 'ageOverValidation';
export const VALID_USERNAME_REQUIRED = 'usernameTooltip';
export const VALID_FIRST_NAME_REQUIRED = 'firstNameTooltip';
export const VALID_DISPLAY_NAME_REQUIRED = 'displayNameTooltip';
export const INVALID_USERNAME_CHARS = 'usernameValidationError';
export const INVALID_DISPLAY_NAME_CHARS = 'displayNameValidationError';
export const USERNAME_ALREADY_USED = { message: 'username-already-used', key: 'usernameAlreadyUsed' };
export const USERNAME_NOT_AVAILABLE = 'nameNotAvailableText';

/**
 * Join > Upload Photo
 */
export const PHOTO_TOO_SMALL = 'photoTooSmallValidation';
export const PHOTO_UNSUITABLE = 'photoUnsuitableValidation';
export const PHOTO_UNSUITABLE_SUGGESTIVE = 'photoUnsuitableValidationText';
export const PHOTO_NOT_ALLOWED_AS_PRIMARY = 'photoNotApprovedAsPrimaryText';
export const PHOTO_EXCEEDS_MAX_SIZE = 'photoUploadNotSuitableErrorText';
export const PHOTO_PENDING_ADMIN_APPROVAL = 'photoPendingApprovalText';
export const PHOTO_DOES_NOT_FIT_GUIDELINES = 'photoDoesntFitGuidelinesText';

/**
 * Wink > Send wink
 */
export const WINK_EXISTS = 'wink-already-exists';
export const TAKING_A_BREAK_WINK_CONVO_INVALID = 'taking-break-cannot-wink-conversation';

/**
 * Settings
 */
export const UPDATE_USERNAME_INVALID = 'usernameValidationError';
export const UPDATE_EMAIL_ADDRESS_INVALID = 'emailValidationText';
export const UPDATE_PASSWORD_INVALID = 'invalidPasswordText';
export const UPDATE_PASSWORD_NEW_PASSWORDS_MISMATCH = 'changePasswordErrorNotSame';
export const UPDATE_PASSWORD_CANNOT_USE_OLD_PASSWORD = 'changePasswordErrorSame';
