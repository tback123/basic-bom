import { Button, Typography, Box, useTheme } from "@material-ui/core";
import { TextField, ButtonGroup, MenuItem, Grid } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import qs from 'qs'

import { useState } from "react";

function AddPart(props) {
    const theme = useTheme();
    const [part, setPart] = useState({
        description: "",
        part_num: "",
        bom_type: "component",
        source: "internal",
        qty_per: "",
        order_qty: "",
        design_eng_comments: "",
        drawing: true,
        material: 1,
        supplier: 1,
        location: 1,
        revision: 1,
        stock_qty: 0
    })

    const { addPart, onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const onSubmit = () => {
        console.log(part);
        axios.post('/parts', qs.stringify(part))
            .then((response) => {
                // console.log(response.data);
            }).catch((error)=> {
                console.log(error);
            })
        handleClose();
    }


    const suppliers = [
        {
            value: '1',
            label: 'Supplier 1',
        },
        {
            value: '2',
            label: 'Supplier 2',
        },
        {
            value: '3',
            label: 'Supplier 3',
        },
        {
            value: '4',
            label: 'Supplier 4',
        },
    ];

    const materials = [
        {
            value: '1',
            label: 'Material 1',
        },
        {
            value: '2',
            label: 'Material 2',
        },
        {
            value: '3',
            label: 'Material 3',
        },
        {
            value: '4',
            label: 'Material 4',
        },
    ];

    return (
        <Dialog onClose={handleClose} open={open}>
            <Typography component="h1" variant="h5">
                Title
            </Typography>
            <Box component="form" noValidate display="flex" justifyContent="center" flexDirection="column" style={{ margin: theme.spacing(1) }}>
                <TextField
                    variant='outlined'
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

                <Typography component="h2"> Material </Typography>
                <TextField
                    variant='outlined'
                    select
                    label="Select"
                    value={part['material']}
                    onChange={(e) => { setPart({ ...part, material: e.target.value }) }}
                >
                    {materials.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography component="h2"> BOM Type </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['bom_type'] === "component" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "bom_type": "component" }) }}> component </Button>
                    <Button color='primary' variant={part['bom_type'] === "assembly" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "bom_type": "assembly" }) }}> assembly </Button>
                    <Button color='primary' variant={part['bom_type'] === "installation" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "bom_type": "installation" }) }}> installation </Button>
                </ButtonGroup>

                <Typography component="h2"> Source </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['source'] === "internal" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "source": "internal" }) }}> internal </Button>
                    <Button color='primary' variant={part['source'] === "external" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "source": "external" }) }}> external </Button>
                </ButtonGroup>

                <Typography component="h2"> Supplier </Typography>
                <TextField
                    variant='outlined'
                    select
                    label="Select"
                    value={part['supplier']}
                    onChange={(e) => { setPart({ ...part, supplier: e.target.value }) }}
                >
                    {suppliers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography component="h2"> Does this part have a Sunswift Engineering Drawing? </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['drawing'] === true ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "drawing": true }) }}> Yes </Button>
                    <Button color='primary' variant={part['drawing'] === false ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "drawing": false }) }}> No </Button>
                </ButtonGroup>

                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="part_num"
                    label="Part Number"
                    helperText
                    placeholder="SR8-ES-0001"
                    name="part_num"
                    autoFocus
                    value={part['part_num']}
                    onChange={(e) => setPart({ ...part, "part_num": e.target.value })}
                />
                <Grid container direction={'row'}>

                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        id="qty_per"
                        label="Quantity Per"
                        name="qty_per"
                        autoFocus
                        value={part['qty_per']}
                        onChange={(e) => setPart({ ...part, "qty_per": e.target.value })}
                    />


                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        id="to_order"
                        label="Quantity To Order"
                        name="qty_to_order"
                        autoFocus
                        value={part['order_qty']}
                        onChange={(e) => setPart({ ...part, "order_qty": e.target.value })}
                    />

                </Grid>
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="design_eng_comments"
                    label="Design Engineer Comments"
                    name="design_eng_comments"
                    autoFocus
                    multiline
                    value={part['design_eng_comments']}
                    minRows={2}
                    onChange={(e) => setPart({ ...part, "design_eng_comments": e.target.value })}
                />
            </Box>
            
            <Button color="primary" variant="contained" onClick={onSubmit}>
                Submit
            </Button>
        </Dialog >
    );
}

export default AddPart;