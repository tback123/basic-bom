import { Button, Typography, Box, useTheme, Snackbar } from "@material-ui/core";
import { TextField, ButtonGroup, MenuItem, Grid } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useEffect } from "react";
import axios from "axios";
import qs from 'qs'

import { useState } from "react";

function AddPart(props) {
    const theme = useTheme();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState();

    const defaultPart = {
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
    }

    // Default Part State
    const [part, setPart] = useState(defaultPart);
    const [suppliers, setSuppliers] = useState([]);
    const [materials, setMaterials] = useState([]);

    // Import Props
    const { onClose } = props;

    // Handle the submit button
    const onSubmit = () => {
        // Post the part to the backend
        axios.post('/parts', qs.stringify(part))
            .then((response) => {
                // If successful, reset the form, close the dialog and force a refresh
                setPart(defaultPart);
                onClose(true);
            }).catch((error) => {
                // If unsuccessful, set error true, and store the error
                console.log(error.response);
                setIsError(true);
                setError(error.response);
            })
    }

    // Get suppliers from backend
    const fetchSuppliers = () => {

        // Reset Supplier list before getting updated list
        setSuppliers([]);

        axios.get('/suppliers')
            .then((response) => {
                response.data.forEach((val) => {
                    setSuppliers([...suppliers, val])
                })
            })
    }

    // Get materials from backend
    const fetchMaterials = () => {

        // Reset Materials list before getting materials
        setMaterials([]);

        axios.get('/materials')
            .then((response) => {
                response.data.forEach((val) => {
                    setMaterials([...materials, val]);
                })
            })
    }

    useEffect(() => {
        fetchSuppliers();
        fetchMaterials();
    }, [])

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
                    The part was not successfully added
                    <br /><br />
                    {error}
                </Alert>
            </Snackbar>

            {/* Header */}
            <Typography component="h1" variant="h5">
                Add a part!
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
                    label="Part Description"
                    name="description"
                    placeholder="M12-5 T-Splitter Connector"
                    autoFocus
                    value={part['description']}
                    onChange={(e) => setPart({ ...part, "description": e.target.value })}
                />

                {/* Material Selector */}
                <Typography component="h2"> Material </Typography>
                <TextField
                    variant='outlined'
                    select
                    label="Select"
                    value={part['material']}
                    onChange={(e) => { setPart({ ...part, material: e.target.value }) }}
                >
                    {materials.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name} - (ID: {option.id})
                        </MenuItem>
                    ))}
                </TextField>

                {/* BOM Type Selector */}
                <Typography component="h2"> BOM Type </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['bom_type'] === "component" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "bom_type": "component" }) }}> component </Button>
                    <Button color='primary' variant={part['bom_type'] === "assembly" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "bom_type": "assembly" }) }}> assembly </Button>
                    <Button color='primary' variant={part['bom_type'] === "installation" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "bom_type": "installation" }) }}> installation </Button>
                </ButtonGroup>

                {/* Parent Part ID - See conditional requirement */}
                <Typography component="h2"> Parent Part </Typography>
                <TextField
                    variant='outlined'
                    label="Parent Part ID"
                    value={part['parent']}
                    helperText="Any part, other than an installation, needs a parent part."
                    required={part['bom_type'] == "component" || part['bom_type'] == "assembly"}
                    onChange={(e) => { setPart({ ...part, parent: e.target.value }) }}
                >

                </TextField>

                {/* Part Source */}
                <Typography component="h2"> Source </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['source'] === "internal" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "source": "internal" }) }}> internal </Button>
                    <Button color='primary' variant={part['source'] === "external" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "source": "external" }) }}> external </Button>
                </ButtonGroup>

                {/* Part Supplier */}
                <Typography component="h2"> Supplier </Typography>
                <TextField
                    variant='outlined'
                    select
                    label="Select"
                    value={part['supplier']}
                    onChange={(e) => { setPart({ ...part, supplier: e.target.value }) }}
                >
                    {suppliers.map((option) => (
                        <MenuItem key={option.value} value={option.id}>
                            {option.name} - (ID: {option.id})
                        </MenuItem>
                    ))}
                </TextField>

                {/* Engineering Drawing */}
                <Typography component="h2"> Does this part have a Sunswift Engineering Drawing? </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['drawing'] === true ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "drawing": true }) }}> Yes </Button>
                    <Button color='primary' variant={part['drawing'] === false ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "drawing": false }) }}> No </Button>
                </ButtonGroup>

                {/* Part Number */}
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

                {/* Quantities */}
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

                {/* Comments */}
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
            {/* END Form Wrapper */}

            {/* Submit Button */}
            <Button color="primary" variant="contained" onClick={onSubmit}>
                Submit
            </Button>
        </>
    );
}

export default AddPart;