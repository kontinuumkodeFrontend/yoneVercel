import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const passenger_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function SelectBox({
  place,
  setPass,
  pass,
  setAgeValues,
  isTouched,
  isError,
  touchStatus,
  errorStatus,
}) {
  const handleChange = (event) => {
    const selectedPass = event.target.value;
    let ageFields = {};
    for (let i = 1; i <= parseInt(event.target.value); i++) {
      ageFields[`age${i}`] = "";
    }
    setPass(selectedPass);
    setAgeValues(ageFields);
    isError("");
    isTouched(false);
    if (selectedPass < 1) {
      isError("Please select number of passengers");
    }
  };

  const handleBlur = () => {
    // Set touched status when user leaves the input
    isTouched(true);
    // Validate if touched but no value selected
    if (touchStatus && pass === "") {
      isError("Please select number of passengers");
    } else {
      isError("");
    }
  };

  return (
    <div className="cstm-select">
      <FormControl
        sx={{ width: "100%" }}
        className={errorStatus && touchStatus ? "error-border" : ""}
      >
        <Select
          displayEmpty
          value={pass}
          onChange={handleChange}
          onBlur={handleBlur}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>{place}</em>
          </MenuItem>
          {passenger_num.map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
