import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const PasswordInput = ({
  labelName,
  fieldProps,
  error,
  helperText,
  showPassword,
  setShowPassword,
}) => {
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl variant="outlined" className={error ? 'pass-error pwd-input' : 'pwd-input'}>
      <InputLabel htmlFor={labelName}>{labelName}</InputLabel>
      <OutlinedInput
        id="labelName"
        type={showPassword ? "text" : "password"}
        {...fieldProps}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={labelName}
      />
      {error && <div className="error">{helperText}</div>}
    </FormControl>
  );
};
