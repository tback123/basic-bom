import React from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@material-ui/core";
import { Controller } from "react-hook-form";


// Converted to js function from this tsx code:
// https://github.com/Mohammad-Faisal/react-hook-form-material-ui/blob/master/src/form-components/FormInputDropdown.tsx

function FormInputRadio(props) {

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

    const generateRadioOptions = () => {
        return options.map((singleOption) => (
            <FormControlLabel
                value={singleOption.value}
                label={singleOption.label}
                control={<Radio />}
            />
        ));
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                }) => (
                    <RadioGroup value={value} onChange={onChange}>
                        {generateRadioOptions()}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};

export default FormInputRadio