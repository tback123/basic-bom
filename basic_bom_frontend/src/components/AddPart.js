import { Button, Paper, Typography, Box, useTheme } from "@material-ui/core";
import { TextField, ButtonGroup, RadioGroup, Radio, FormControlLabel, FormLabel } from "@material-ui/core";
import { Dialog, DialogTitle, FormControl, Checkbox } from "@material-ui/core";

import FormInputDropdown from "./form/FormInputDropdown"
import FormInputRadio from "./form/FormInputRadio"



import { Controller, FormProvider, useForm } from "react-hook-form";
import { useState } from "react";


function AddPart(props) {
    const theme = useTheme();

    const { description, setDescriptionState } = useState("");

    const { addPart, onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box display="flex" justifyContent="center" flexDirection="column" style={{ margin: theme.spacing(1) }}>
                <form>
                    <div>
                        <TextField variant="outlined" id="description" label="description" />
                    </div>
                    <div>
                        <Typography>Has this part got a drawing?</Typography>
                        <ButtonGroup  color="primary">
                            <Button variant="contained">Yes</Button>
                            <Button variant="outlined">No</Button>
                        </ButtonGroup>
                    </div>
                    <div>
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
                    </div>


                </form>

            </Box>

        </Dialog >
    );
}

export default AddPart;