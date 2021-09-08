import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";

// Converted to js function from this tsx code:
// https://github.com/Mohammad-Faisal/react-hook-form-material-ui/blob/master/src/form-components/FormInputDropdown.tsx

function FormInputDropdown(props) {

    const { name, control, label, options } = props
    /*
        Where 'options' looks like:
        const options = [
            {
                "label": "Dropdown Option 1",
                "value": "1",
            },
            {
                "label": "Dropdown Option 2",
                "value": "2",
            },
        ];
    */

    const generateSingleOptions = () => {
        return options.map((option) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };

    return (
        <FormControl size={"small"}>
            <InputLabel>{label}</InputLabel>
            <Controller
                render={({ field: { onChange, value } }) => (
                    <Select onChange={onChange} value={value}>
                        {generateSingleOptions()}
                    </Select>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    );

};

export default FormInputDropdown;