import isEmail from "validator/lib/isEmail";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const validateIsNumber =
  (msg = "Must be a number.") =>
  (value) =>
    isNaN(value) ? msg : undefined;

export const validateMaxLength =
  (maxLength, msg = `Must be maximum of ${maxLength}.`) =>
  (val) =>
    val.length > maxLength ? msg : undefined;

export const validateMinLength =
  (minLength, msg = `Must be minimum of ${minLength}.`) =>
  (val) =>
    val.length < minLength ? msg : undefined;

export const validateRequired =
  (msg = "Required.") =>
  (value) =>
    // check against length because unfilled checkboxes produces empty array
    value && value.length !== 0 ? undefined : msg;
