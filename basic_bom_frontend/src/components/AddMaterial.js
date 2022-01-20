import { Button, Typography, Box, useTheme, Snackbar } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import qs from 'qs'

import { useState } from "react";

function AddMaterial({ onClose }) {
    const theme = useTheme();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState();

    const defaultMaterial = {
        name: "",
        properties: "",
    }

    // Default Part State
    const [material, setMaterial] = useState(defaultMaterial);

    // Handle the submit button
    const onSubmit = () => {
        // Post the material to the backend
        axios.post('/materials', qs.stringify(material))
            .then((response) => {
                // If successful, reset the form, close the dialog and force a refresh
                // console.log(response);
                setMaterial(defaultMaterial);
                onClose(true);
                setIsError(false);
                return;
            }).catch((error) => {
                setError(JSON.stringify(error.response))
                setIsError(true)
            })
    }

    return (

        <>
            {/* This is a place for the alerts to be shown */}
            <Snackbar
                open={isError}
                autoHideDuration={6000}
                onClose={() => { setIsError(false) }}>
                <Alert
                    severity="error"
                    onClose={() => { setIsError(false) }}>
                    <AlertTitle>Error</AlertTitle>
                    The material was not successfully added
                    <br /><br />
                    {error}
                </Alert>
            </Snackbar>

            {/* Header */}
            <Typography component="h1" variant="h5">
                Add a material!
            </Typography>

            {/* Form Wrapper */}
            <Box component="form" noValidate display="flex" justifyContent="center" flexDirection="column" style={{ margin: theme.spacing(1) }}>

                {/* Description */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="Name"
                    placeholder="E.g. Aluminium"
                    autoFocus
                    value={material['name']}
                    onChange={(e) => setMaterial({ ...material, "name": e.target.value })}
                />

                {/* Comments */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    fullWidth
                    id="properties"
                    label="Properties"
                    name="Properties"
                    autoFocus
                    multiline
                    value={material['properties']}
                    minRows={2}
                    onChange={(e) => setMaterial({ ...material, "properties": e.target.value })}
                />
            </Box>
            {/* END Form Wrapper */}

            {/* Submit Button */}
            <Button color="primary" variant="contained" onClick={onSubmit}>
                Submit
            </Button>
        </>
    );
}

export default AddMaterial;