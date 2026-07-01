import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const CampoTexto = ({
  isEditing,
  type = "text",
  value,
  onChange,
  InputProps,
  ...props
}) => {

  if (type === "date") {
    return (
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(newValue) =>
          onChange({
            target: {
              value: newValue ? newValue.format("YYYY-MM-DD") : "",
            },
          })
        }
        disabled={!isEditing}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            ...props,
          },
        }}
      />
    );
  }

  return (
    <TextField
    {...props}
    type={type}
    value={value}
    onChange={onChange}
    fullWidth
    disabled={!isEditing}
    InputProps={InputProps}
  />
  );
};