export const required = (value) => {
  return {
    isTrue: value.trim() !== "" && value.trim() !== null,
    msg: value.trim() !== "" && value.trim() !== null ? "" : "Required",
  };
};

export const emailValidation = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value) ? "" : "Enter a valid email",
  };
};

export const password = (value) => {
  const regex = /[0-9a-zA-Z]{6,}/;
  return {
    isTrue: regex.test(value),
    msg: regex.test(value) ? "" : "Password must be above six characters",
  };
};

export const confirmPassword = (cPassword, password) => {
  return {
    isTrue: cPassword === password,
    msg: cPassword === password ? "" : "Password Mismatch",
  };
};

export const numberCheck = (value) => {
  const regex = /^[0-9]{11}$/;
  return {
    isTrue: regex.test(value),
    msg : regex.test(value) ? "" : "Number must be 11 digits"
  };
};
