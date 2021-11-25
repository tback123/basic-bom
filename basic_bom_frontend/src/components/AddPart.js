import { Button, Paper, Typography, Box, useTheme } from "@material-ui/core";
import { TextField, FormGroup, ButtonGroup } from "@material-ui/core";
import { Dialog, DialogTitle, FormControl, Checkbox, FormLabel, FormControlLabel } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

import { useState } from "react";


function AddPart(props) {
    const theme = useTheme();
    const [part, setPart] = useState({
        description: "",
        part_num: "",
        bom_type: "component"
    })

    const { addPart, onClose, open } = props;

    const handleClose = () => {
        onClose();
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <Typography component="h1" variant="h5">
                Title
            </Typography>
            <Box component="form" noValidate display="flex" justifyContent="center" flexDirection="column" style={{ margin: theme.spacing(1) }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Part Description"
                    name="description"
                    placeholder="M12-5 T-Splitter Connector"
                    autoFocus
                    value={part['description']}
                    onChange={(e) => setPart({ ...part, "description": e.target.value })}
                />
                {/* <ButtonGroup>
                    <Button color='primary' variant={{part['bom_type'] == "component" ? 'contained' : ''}}> Hello </Button>
                    <Button> Hello </Button>
                </ButtonGroup> */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="part_num"
                    label="Part Number"
                    placeholder="SR8-ES-0001"
                    name="part_num"
                    autoFocus
                    value={part['part_num']}
                    onChange={(e) => setPart({ ...part, "part_num": e.target.value })}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
            </Box>

        </Dialog >
    );
}

export default AddPart;