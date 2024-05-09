import "../../styles/ModalContent.css";
import "../../styles/globalStyles.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect, useRef } from "react";

function InputText({
  type = "text",
  label = "Label",
  required = false,
  disabled = false,
  setValue,
  value = "",
  arrayValue = [],
  defaultValue = "",
  maxLength = 255,
  minLength = 0,
  selectData = [],
  placeholder = "",
  multipleValues = false,
  children,
}) {
  let paddingRight = "20px";

  useEffect(() => {
    if (defaultValue !== undefined || defaultValue !== null) {
      setValue(defaultValue);
    }
  }, []);
  if (children !== undefined) {
    paddingRight = "40px";
  }

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

  return (
    <div className="inputTextMargin">
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        className="formLabel"
      >
        {label}
        {required === true && <span className="asteriskSpan">*</span>}
      </Typography>
      <div className="relativeDiv">
        {multipleValues === false ? (
          <>
            <TextField
              id="outlined-basic"
              type={type}
              variant="outlined"
              value={value}
              placeholder={placeholder}
              InputProps={{
                readOnly: disabled,
              }}
              inputProps={{ maxLength: maxLength, minLength: minLength }}
              multiline
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
