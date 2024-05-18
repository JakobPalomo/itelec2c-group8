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
  let initials = "";
  let bgColor = "#ff6262";
  if (passedname === "undefined" || passedname === "null") {
    name = "";
  } else if (passedname === "Deleted User") {
    name = "";
  } else {
    name = passedname;
    const nameParts = name.split(" ");
    initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`;
    bgColor = stringToColor(name);
  }

  return {
    sx: {
      backgroundColor: `${bgColor} !important`,
      color: `${getContrastingTextColor(stringToColor(name))} !important`,
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
  if (string === "Deleted User") {
    color = "#ff6262";
  }
  return color;
};

// black and white
const getTextColor = (backgroundColor) => {
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.5) {
    // Light background - use dark text
    return "#000000";
  } else {
    // Dark background - use light text
    return "#FFFFFF";
  }
};

const getContrastingTextColor = (backgroundColor) => {
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.5) {
    // Light background - use a darker version of the color
    return shadeColor(backgroundColor, -0.6);
  } else {
    // Dark background - use a lighter version of the color
    return shadeColor(backgroundColor, 1);
  }
};

const shadeColor = (color, percent) => {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
};

export {
  stringAvatar,
  stringToColor,
  handleSetError,
  getHasError,
  getErrMessage,
};
