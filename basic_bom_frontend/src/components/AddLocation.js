import { Button, Typography, Box, useTheme, Snackbar } from "@material-ui/core";
import { TextField} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import qs from 'qs'

import { useState } from "react";

function AddLocation({ onClose }) {
    const theme = useTheme();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState();

    const defaultLocation = {
        name: "",
        building: "",
        room: "",
        area: "",
        specifics: "",
        comments: "",
    }

    // Default Part State
    const [location, setLocation] = useState(defaultLocation);

    // Handle the submit button
    const onSubmit = () => {
        // Post the location to the backend
        axios.post('/locations', qs.stringify(location))
            .then((response) => {
                // If successful, reset the form, close the dialog and force a refresh
                // console.log(response);
                setLocation(defaultLocation);
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
                    The location was not successfully added
                    <br /><br />
                    {error}
                </Alert>
            </Snackbar>

            {/* Header */}
            <Typography component="h1" variant="h5">
                Add a location!
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
                    placeholder="E.g. SE1-2"
                    autoFocus
                    value={location['name']}
                    onChange={(e) => setLocation({ ...location, "name": e.target.value })}
                />

                {/* Comments */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="building"
                    label="Building"
                    name="Building"
                    placeholder="UNSW J18"
                    autoFocus
                    multiline
                    value={location['building']}
                    minRows={2}
                    onChange={(e) => setLocation({ ...location, "building": e.target.value })}
                />

                {/* Comments */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    fullWidth
                    id="room"
                    label="Room"
                    name="Room"
                    placeholder="Room 106"
                    autoFocus
                    multiline
                    value={location['room']}
                    minRows={2}
                    onChange={(e) => setLocation({ ...location, "room": e.target.value })}
                />

                {/* Area */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    fullWidth
                    id="area"
                    label="Area"
                    name="Area"
                    placeholder="Electrical Compactor 2"
                    autoFocus
                    multiline
                    value={location['area']}
                    minRows={2}
                    onChange={(e) => setLocation({ ...location, "area": e.target.value })}
                />

                {/* Specifics */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    fullWidth
                    id="specifics"
                    label="Specifics"
                    name="Specifics"
                    placeholder="Shelf 3"
                    autoFocus
                    multiline
                    value={location['specifics']}
                    minRows={2}
                    onChange={(e) => setLocation({ ...location, "specifics": e.target.value })}
                />

                {/* Comments */}
                <TextField
                    variant='outlined'
                    margin="normal"
                    fullWidth
                    id="comments"
                    label="Comments"
                    name="Comments"
                    autoFocus
                    multiline
                    value={location['comments']}
                    minRows={2}
                    onChange={(e) => setLocation({ ...location, "comments": e.target.value })}
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

export default AddLocation;