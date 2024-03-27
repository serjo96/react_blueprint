import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type InputPasswordProps = {
  value: string;
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;

  errors?: string | string[];
};
export const InputPassword = ({
  value,
  handleChange,
  errors,
  ...props
}: TextFieldProps & InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={handleChange}
      error={Boolean(errors)}
      helperText={errors || ''}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
