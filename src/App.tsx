import "./styles.css";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import {
  Stack,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const formSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is mendatory")
      .min(3, "Password must be at 3 char long"),
    confirmPassword: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("newPassword")], "Passwords don't match")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm(formOptions);

  const onSubmit = (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      setError(
        "confirmPassword",
        { type: "focus", message: "mismatching password and confirm" },
        { shouldFocus: true }
      );
      return;
    }
    alert(JSON.stringify(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} margin={2}>
        <Typography variant="h5" align="center">
          Change Your Password
        </Typography>
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("newPassword", {
            required: "new password is required."
          })}
          error={errors.newPassword}
          helperText={errors.newPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: "confirm password is required."
          })}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained">
          change password
        </Button>
      </Stack>
    </form>
  );
}
