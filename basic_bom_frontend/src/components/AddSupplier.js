import { Button, Typography, Box, useTheme, Snackbar } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import qs from 'qs'

import { useState } from "react";

function AddSupplier({ onClose }) {
    const theme = useTheme();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState();

    const defaultSupplier = {
        name: "",
        contact_info: "",
        address: "",
        comments: "",
    }

    // Default Part State
    const [supplier, setSupplier] = useState(defaultSupplier);

    // Handle the submit button
    const onSubmit = () => {
        // Post the supplier to the backend
        axios.post('/suppliers', qs.stringify(supplier))
            .then((response) => {
                // If successful, reset the form, close the dialog and force a refresh
                // console.log(response);
                setSupplier(defaultSupplier);
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
                    The supplier was not successfully added
                    <br /><br />
                    {error}
                </Alert>
            </Snackbar>

            {/* Header */}
            <Typography component="h1" variant="h5">
                Add a supplier!
            </Typography>

            {/* Form Wrapper */}
            <Box component="form" noValidate display="flex" justifyContent="center" flexDirection="column" style={{ margin: theme.spacing(1) }}>

                {/* Description */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Supplier Name"
                    name="Supplier Name"
                    placeholder="E.g. Mouser"
                    autoFocus
                    value={supplier['name']}
                    onChange={(e) => setSupplier({ ...supplier, "name": e.target.value })}
                />

                {/* Comments */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="contact_info"
                    label="Contact info"
                    name="Contact info"
                    autoFocus
                    multiline
                    value={supplier['contact_info']}
                    minRows={2}
                    onChange={(e) => setSupplier({ ...supplier, "contact_info": e.target.value })}
                />

                {/* Comments */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Address"
                    name="Address"
                    autoFocus
                    multiline
                    value={supplier['address']}
                    minRows={2}
                    onChange={(e) => setSupplier({ ...supplier, "address": e.target.value })}
                />

                {/* Comments */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="comments"
                    label="Comments"
                    name="Comments"
                    autoFocus
                    multiline
                    value={supplier['comments']}
                    minRows={2}
                    onChange={(e) => setSupplier({ ...supplier, "comments": e.target.value })}
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

export default AddSupplier;