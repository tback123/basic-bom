import { Button, Typography, Box, useTheme } from "@material-ui/core";
import { TextField, ButtonGroup, MenuItem, Grid } from "@material-ui/core";
import { Dialog } from "@material-ui/core";

import { useState } from "react";


function AddPart(props) {
    const theme = useTheme();
    const [part, setPart] = useState({
        description: "",
        part_num: "",
        bom_type: "component",
        source: "internal",
        qty_per: "",
        qty_to_order: "",
        design_eng_comments: "",
        has_drawing: true,
        material_id: 1,
        supplier_id: 1,
    })

    const { addPart, onClose, open } = props;

    const handleClose = () => {
        onClose();
    };


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
                    value={part['material_id']}
                    onChange={(e) => { setPart({ ...part, material_id: e.target.value }) }}
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
                    value={part['supplier_id']}
                    onChange={(e) => { setPart({ ...part, supplier_id: e.target.value }) }}
                >
                    {suppliers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography component="h2"> Does this part have a Sunswift Engineering Drawing? </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['has_drawing'] === true ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "has_drawing": true }) }}> Yes </Button>
                    <Button color='primary' variant={part['has_drawing'] === false ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "has_drawing": false }) }}> No </Button>
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
                        id="qty_to_order"
                        label="Quantity To Order"
                        name="qty_to_order"
                        autoFocus
                        value={part['qty_to_order']}
                        onChange={(e) => setPart({ ...part, "qty_to_order": e.target.value })}
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

        </Dialog >
    );
}

export default AddPart;