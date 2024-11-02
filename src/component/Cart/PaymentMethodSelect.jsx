import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Field, ErrorMessage, useField, useFormikContext } from "formik";

const PaymentMethodSelect = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  const handleChange = (event) => {
    setFieldValue(field.name, event.target.value);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={meta.touched && !!meta.error}
    >
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...field} onChange={handleChange}>
        <MenuItem value="cash">Tiền mặt</MenuItem>
        <MenuItem value="transfer">Chuyển khoản</MenuItem>
      </Select>
      <FormHelperText>
        <ErrorMessage name={field.name} />
      </FormHelperText>
    </FormControl>
  );
};

export default PaymentMethodSelect;
