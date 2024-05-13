import React, { useState, useEffect, useRef } from "react";
import { TextField, MenuItem, Autocomplete, Chip } from "@mui/material";
import "../../styles/ModalContent.css";
import "../../styles/globalStyles.css";

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
  hasError = false,
  errMessage = "",
  children,
}) {
  let paddingRight = "20px";

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setValue(defaultValue);
    }
  }, []);

  if (children !== undefined) {
    paddingRight = "40px";
  }

  const [inputValue, setInputValue] = useState("");
  const optionRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (setValue) {
      setValue(event.target.value);
    }
  };

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
      <div>
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
                borderColor: "#FFBA5A",
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
          onChange={handleChange}
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
      </div>
    </div>
  );
}

export default InputText;
