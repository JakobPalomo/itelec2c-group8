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

export { handleSetError, getHasError, getErrMessage };
