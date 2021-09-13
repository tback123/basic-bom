import { Button, Paper, Typography, Box, useTheme } from "@material-ui/core";
import { TextField, ButtonGroup } from "@material-ui/core";
import { Dialog, DialogTitle, FormControl, Checkbox } from "@material-ui/core";

import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

import FormInputDropdown from "./form/FormInputDropdown"
import FormInputRadio from "./form/FormInputRadio"

import { useState } from "react";

import { useFormik, Form } from 'formik';
import * as yup from 'yup'

const validationSchema = yup.object({
    description: yup
        .string('Enter a description of the part')
        .required('A description is required'),
    has_drawing: yup.boolean()
});

function AddPart(props) {
    const theme = useTheme();

    const { addPart, onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const formik = useFormik({
        initialValues: {
            description: '',
            has_drawing: 'true'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(values)
        },
        onReset: (values) => {
            alert(JSON.stringify(values, null, 2));
        }

    });

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box display="flex" justifyContent="center" flexDirection="column" style={{ margin: theme.spacing(1) }}>

                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            variant="outlined"
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} />
                    </div>
                    <div>
                        <Typography>Has this part got a drawing?</Typography>
                        <ToggleButtonGroup 
                            id="has_drawing"
                            value={formik.values.has_drawing}
                            onChange={formik.handleChange}
                            aria-label="text formatting">
                            <ToggleButton value="true" aria-label="yes">
                                Yes
                            </ToggleButton>
                            <ToggleButton value="false" aria-label="no">
                                No
                            </ToggleButton>

                        </ToggleButtonGroup>


                    </div>
                    {/* <div>
                        <Typography>Type</Typography>
                        <ButtonGroup  color="primary">
                            <Button variant="contained">Component</Button>
                            <Button variant="outlined">Assembly</Button>
                            <Button variant="outlined">Installation</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <Typography>Source</Typography>
                        <ButtonGroup  color="primary">
                            <Button variant="contained">Internal</Button>
                            <Button variant="outlined">External</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <TextField variant="outlined" id="part_num" label="part_num" />
                    </div>
                    <div>
                        <TextField variant="outlined" id="revision" label="revision" />
                    </div>
                    <div>
                        <TextField variant="outlined" id="qty_per" label="qty_per" />
                    </div>
                    <div>
                        <TextField variant="outlined" id="qty_to_order" label="qty_to_order" />
                    </div>
                    <div>
                        <Typography>Supplier Placeholder</Typography>
                    </div>
                    <div>
                        <TextField variant="outlined" id="comments" label="comments" />
                    </div> */}
                    <div>
                        <Button variant="contained" type="submit">Submit</Button>
                    </div>


                </form>

            </Box>

        </Dialog >
    );
}

export default AddPart;