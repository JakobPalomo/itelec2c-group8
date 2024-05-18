import "../../styles/ModalContent.css";
import "../../styles/globalStyles.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect, useRef } from "react";

function InputText({
  type = "text",
  label = "Label",
  required = false,
  disabled = false,
  setValue,
  setOtherValue,
  value = "",
  arrayValue = [],
  defaultValue = "",
  maxLength = 255,
  minLength = 0,
  selectData = [],
  placeholder = "",
  multipleValues = false,
  freeSoloInput = false,
  hasError = false,
  errMessage = "",
  options = [],
  setOptions,
  visibility = false,
  setVisibility,
  iconOn,
  iconOff,
  noLabel = false,
  dropDownAction,
  children,
}) {
  let paddingRight = "20px";
  let height = "auto";
  if (type === "password") {
    height = "43px";
  }

  // Default Value
  useEffect(() => {
    console.log(iconOn);
    console.log(iconOff);
    if (defaultValue !== undefined || defaultValue !== null) {
      setValue(defaultValue);
    }
  }, []);
  if (children !== undefined) {
    paddingRight = "40px";
  }

  // Other Name Chip
  const [inputValue, setInputValue] = useState("");
  const optionRef = useRef(null);

  const handleMultiValKeyPress = (event, newValue) => {
    if (event.key === "Enter" && newValue !== undefined && newValue !== null) {
      event.preventDefault();
      const trimmedValue = newValue.trim();
      if (newValue.trim() !== "" && !arrayValue.includes(trimmedValue)) {
        if (optionRef.current) {
          optionRef.current.click();
        }
        setValue([...arrayValue, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const handleChipDelete = (indexToRemove) => {
    const updatedArray = arrayValue.filter(
      (_, index) => index !== indexToRemove
    );
    setValue(updatedArray);
  };

  // Location/Address Search
  // const [options, setOptions] = useState([
  //   { label: "The Shawshank Redemption", year: 1994 },
  //   { label: "The Godfather", year: 1972 },
  // ]);
  const filter = createFilterOptions();
  const inputRef = useRef(null);

  return (
    <div className="inputTextMargin">
      {noLabel === false && (
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          className="formLabel"
        >
          {label}
          {required === true && <span className="asteriskSpan">*</span>}
          {hasError === true && <span className="errorSpan">{errMessage}</span>}
        </Typography>
      )}
      <div className="relativeDiv">
        {multipleValues === false && freeSoloInput === false ? (
          <>
            <TextField
              id="outlined-basic"
              type={type}
              variant="outlined"
              value={value}
              placeholder={placeholder}
              InputProps={{
                readOnly: disabled,
                ...(iconOn &&
                  iconOff && {
                    endAdornment: (
                      <IconButton onClick={setVisibility}>
                        {visibility ? iconOn : iconOff}
                      </IconButton>
                    ),
                  }),
              }}
              inputProps={{ maxLength: maxLength, minLength: minLength }}
              multiline={type !== "password"}
              maxRows={4}
              select={selectData.length !== 0}
              SelectProps={{
                MenuProps: {
                  sx: {
                    "& .MuiMenu-paper": {
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    },
                    "& .MuiMenu-list": {
                      margin: "0",
                      p: "0",
                    },
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: height,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFBA5A", //#FF6262 pink
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFBA5A",
                  },
                  borderRadius: "20px",
                  p: "0px",
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px !important",
                  p: "10px",
                  paddingLeft: "20px",
                  paddingRight: paddingRight,
                },
                "& .MuiIconButton-root": {
                  marginRight: "10px",
                  marginTop: "0.2px",
                },
                display: "flex",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
              onChange={(e) => setValue(e.target.value)}
            >
              {selectData.length !== 0 &&
                selectData.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    onClick={
                      dropDownAction
                        ? () => dropDownAction(option.value)
                        : () => {}
                    }
                    sx={{
                      fontSize: "14px !important",
                      "& .MuiMenuList-root": {
                        borderRadius: "20px !important",
                      },
                      "&:hover": {
                        backgroundColor: "#fff3f0 !important",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#fceae6 !important",
                      },
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
            {children}
            {noLabel === true && (
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                className="errorSpanNoLabel"
              >
                {hasError === true && <span>{errMessage}</span>}
              </Typography>
            )}
          </>
        ) : freeSoloInput === true ? (
          <>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (newValue == null) {
                  setValue("");
                } else {
                  console.log("newValue:");
                  console.log(newValue);
                  if (typeof newValue.label === "string") {
                    setValue(newValue.label);
                    setOtherValue(newValue.location);
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue(newValue.inputValue);
                    setOtherValue(newValue.location);
                  } else {
                    setValue("");
                    setOtherValue({});
                  }
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                // const isExisting = options.some(
                //   (option) => inputValue === option.label
                // );
                // if (inputValue !== "" && !isExisting) {
                //   filtered.push({
                //     inputValue,
                //     title: `Add "${inputValue}"`,
                //   });
                // }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={options}
              autoHighlight
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.label;
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{
                    "& > img": { mr: 2, flexShrink: 0 },
                    "& > svg": { mr: 2, flexShrink: 0 },
                    "&:hover": {
                      backgroundColor: "#fff3f0 !important",
                    },
                    fontSize: "14px !important",
                  }}
                  {...props}
                >
                  {/* <img loading="lazy" width="20" src="" alt="" /> */}
                  <FmdGoodRoundedIcon className="muiLocationIconGrey" />
                  {option.label}
                </Box>
              )}
              sx={{
                margin: "0",
                padding: "0",
                "& .MuiInputBase-root": {
                  margin: "0px",
                  padding: "4px",
                },
              }}
              slotProps={{
                popper: {
                  sx: {
                    "& .MuiPaper-root": {
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      "& .MuiAutocomplete-listbox": {
                        paddingTop: 0,
                        paddingBottom: 0,
                        "& .MuiAutocomplete-option": {},
                        '& .MuiAutocomplete-option[aria-selected="true"]': {
                          backgroundColor: "#fceae6 !important",
                        },
                        '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused':
                          {
                            backgroundColor: "#fceae6 !important",
                          },
                        "& .MuiAutocomplete-option.Mui-focused": {
                          backgroundColor: "#fff3f0 !important", //light pink
                        },
                      },
                    },
                  },
                },
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-basic"
                  type={type}
                  variant="outlined"
                  placeholder={placeholder}
                  // InputProps={{
                  //   ...params.InputProps,
                  //   endAdornment: (
                  //     <div>
                  //       {children}
                  //       {params.InputProps.endAdornment}
                  //     </div>
                  //   ),
                  // }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FFBA5A", //#FF6262 pink
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FFBA5A",
                      },
                      borderRadius: "20px",
                      paddingLeft: "10px",
                      paddingRight: "70px !important",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px !important",
                      p: "10px",
                      paddingLeft: "20px",
                      paddingRight: paddingRight,
                    },
                    "& .MuiAutocomplete-endAdornment": {
                      right: "40px !important",
                    },
                    display: "flex",
                    backgroundColor: "white",
                    borderRadius: "20px",
                  }}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
            />
            {children}
          </>
        ) : (
          <Autocomplete
            multiple
            id="tags-filled"
            options={[inputValue]}
            // options={
            //   selectData.length !== 0
            //     ? selectData.map((option) => option.name)
            //     : []
            // }
            // defaultValue={selectData.length !== 0 ? [selectData[0].name] : []}
            readOnly={disabled}
            freeSolo={false}
            renderTags={(arrayValue, getTagProps) =>
              arrayValue.map((option, index) => (
                <div style={{ position: "relative" }}>
                  <Chip
                    variant="outlined"
                    label={option}
                    key={option}
                    {...getTagProps({ index })}
                    onChange={(e) => {
                      console.log(e);
                    }}
                    onClick={(e) => {
                      console.log(e);
                    }}
                    onDelete={(event) => {
                      console.log("Delete event:", event);
                      const onDelete = getTagProps({ index }).onDelete;
                      if (typeof onDelete === "function") {
                        onDelete(event);
                      }
                      handleChipDelete(index);
                    }}
                  />
                </div>
              ))
            }
            componentsProps={{
              popper: {
                style: { display: "none" },
              },
              popupIndicator: {
                style: { display: "none" },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={placeholder}
                inputProps={{
                  ...params.inputProps,
                  maxLength: maxLength,
                }}
                value={inputValue}
                helperText="Press enter to add a name"
                // multiline
                // maxRows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FFBA5A", //#FF6262 pink
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FFBA5A",
                    },
                    backgroundColor: "white",
                    borderRadius: "20px",
                    p: "15px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  },
                  "& .MuiOutlinedInput-input": {
                    fontSize: "14px !important",
                    p: "10px",
                    paddingLeft: "20px",
                    paddingRight: paddingRight,
                  },
                  display: "flex",
                  borderRadius: "20px",
                }}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleMultiValKeyPress(e, e.target.value)}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} ref={option === inputValue ? optionRef : null}>
                {option}
              </li>
            )}
          />
        )}
      </div>
    </div>
  );
}

export default InputText;
