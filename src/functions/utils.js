// SET ERRORS
const handleSetError = (variable, message, errors, setErrors) => {
  const index = errors.findIndex((field) => {
    return field.field === variable.toString();
  });
  if (index !== -1) {
    const updatedFields = [...errors];
    updatedFields[index] = {
      ...updatedFields[index],
      hasError: true,
      errMessage: message,
    };
    setErrors(updatedFields);
  }
};

// CHECK IF ERROR
const getHasError = (variable, errors) => {
  const index = errors.findIndex(
    (field) => field.field === variable.toString()
  );
  if (index !== -1) {
    return errors[index].hasError;
  }
};

// GET ERROR MESSAGE
const getErrMessage = (variable, errors) => {
  const index = errors.findIndex(
    (field) => field.field === variable.toString()
  );
  if (index !== -1) {
    return errors[index].errMessage;
  }
};

const stringAvatar = (passedname) => {
  let name = "";
  if (passedname == "undefined" || passedname == "null") {
    name = "P";
  } else {
    name = passedname;
  }

  const nameParts = name.split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}`;

  return {
    sx: {
      backgroundColor: `${stringToColor(name)} !important`,
    },
    children: initials,
  };
};

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  console.log("color");
  console.log(color);
  return color;
};

export {
  stringAvatar,
  stringToColor,
  handleSetError,
  getHasError,
  getErrMessage,
};
