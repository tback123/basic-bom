import { Button, Typography, Box, useTheme, Snackbar, Divider } from "@material-ui/core";
import { TextField, ButtonGroup, MenuItem, Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useEffect } from "react";
import axios from "axios";
import qs from 'qs'

import { useState } from "react";

function AddPart({ onClose }) {
    const theme = useTheme();
    const [isError, setIsError] = useState(false);
    const [partType, setPartType] = useState("proprietary");
    const [spareQty, setSpareQty] = useState();
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

    // Handle the submit button
    const onSubmit = () => {
        // Post the part to the backend
        axios.post('/parts', qs.stringify(part))
            .then((response) => {
                // If successful, reset the form, close the dialog and force a refresh
                // console.log(response);
                setPart(defaultPart);
                onClose(true);
                setIsError(false);
                return;
            }).catch((error) => {
                setError(JSON.stringify(error.response))
                setIsError(true)
            })
    }

    // Get suppliers from backend
    const fetchSuppliers = () => {

        // Reset Supplier list before getting updated list
        setSuppliers([]);

        axios.get('/suppliers')
            .then((response) => {
                response.data.forEach((newItem) => {
                    setSuppliers(prevState => [...prevState, newItem])
                })
            })
    }

    // Get materials from backend
    const fetchMaterials = () => {

        // Reset Materials list before getting materials
        setMaterials([]);

        axios.get('/materials')
            .then((response) => {
                response.data.forEach((newItem) => {
                    setMaterials(prevState => [...prevState, newItem]);
                })
            })
    }

    // Calculates the number of parts to be orders
    const updateQty = () => {
        setPart({ ...part, 'order_qty': ( parseInt(part['qty_per']) + parseInt(spareQty)) });
    }

    useEffect(() => {
        fetchSuppliers();
        fetchMaterials();
        // Note: the below line disables the warning given by useEffect and its dependancy list
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const proprietaryPartForm = () => {

        return (
            <>
                {/* Part Supplier */}
                <Typography component="h2"> Supplier </Typography>
                <TextField
                    variant='outlined'
                    label="Select"
                    select
                    value={part['supplier']}
                    onChange={(e) => { setPart({ ...part, supplier: e.target.value }) }}
                >
                    {suppliers.map((option) => {
                        return <MenuItem key={option.id} value={option.id}>
                            {option.name} - (ID: {option.id})
                        </MenuItem>
                    })}
                </TextField>

                {/* Order Code (Fills the part-num field)*/}
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="order_code"
                    label="Order Code"
                    helperText="Ensure to select the ORDER code and NOT the manufacturer part number!"
                    placeholder="2857210"
                    name="order_code"
                    autoFocus
                    value={part['part_num']}
                    onChange={(e) => setPart({ ...part, "part_num": e.target.value })}
                />

            </>
        )
    }

    const bespokePartForm = () => {
        return (
            <>
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

                {/* Part Supplier */}
                <Typography component="h2"> Supplier </Typography>
                <TextField
                    variant='outlined'
                    label="Select"
                    select
                    value={part['supplier']}
                    onChange={(e) => { setPart({ ...part, supplier: e.target.value }) }}
                >
                    {suppliers.map((option) => {
                        return <MenuItem key={option.id} value={option.id}>
                            {option.name} - (ID: {option.id})
                        </MenuItem>
                    })}
                </TextField>


                {/* Engineering Drawing */}
                <Typography component="h2"> Has the engineering drawing been released? </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['drawing'] === true ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "drawing": true }) }}> Yes </Button>
                    <Button color='primary' variant={part['drawing'] === false ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "drawing": false }) }}> No </Button>
                </ButtonGroup>

                {/* Part Source */}
                <Typography component="h2"> Source </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={part['source'] === "internal" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "source": "internal" }) }}> internal </Button>
                    <Button color='primary' variant={part['source'] === "external" ? 'contained' : 'outlined'} onClick={() => { setPart({ ...part, "source": "external" }) }}> external </Button>
                </ButtonGroup>


            </>
        )
    }

    const currentPartForm = () => {
        if (partType === "proprietary") {
            return proprietaryPartForm();
        } else if (partType === "bespoke") {
            return bespokePartForm();
        }
    }

    const internalPartForm = () => {
        return(
            <>
            
            </>
        )
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
            <Box component="form" noValidate display="flex" justifyContent="center" flexDirection="column" style={{ margin: theme.spacing(3) }}>

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
                    required={part['bom_type'] === "component" || part['bom_type'] === "assembly"}
                    onChange={(e) => { setPart({ ...part, parent: e.target.value }) }}
                > </TextField>

                {/* Department Selector */}
                <Typography component="h2"> Relevant Department </Typography>
                <TextField
                    variant='outlined'
                    label="Department"
                // value={part['parent']}
                // onChange={(e) => { setPart({ ...part, parent: e.target.value }) }}
                > </TextField>

                {/* Subsystem Selector */}
                <Typography component="h2"> Relevant Subsystem </Typography>
                <TextField
                    variant='outlined'
                    label="Subsystem"
                // value={part['parent']}
                // onChange={(e) => { setPart({ ...part, parent: e.target.value }) }}
                > </TextField>



                {/* Propritery or Bespoke */}
                <Typography component="h2"> Part Type </Typography>
                <ButtonGroup>
                    <Button color='primary' variant={partType === "proprietary" ? 'contained' : 'outlined'} onClick={() => { setPartType("proprietary") }}> proprietary </Button>
                    <Button color='primary' variant={partType === "bespoke" ? 'contained' : 'outlined'} onClick={() => { setPartType("bespoke") }}> bespoke </Button>
                </ButtonGroup>


                <Divider></Divider>

                {currentPartForm()}

                <Divider></Divider>

                {/* Quantities */}
                <Grid container direction={'row'}>

                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        id="qty_on_car"
                        label="Quantity On Car"
                        name="qty_on_car"
                        autoFocus
                        value={part['qty_per']}
                        onChange={(e) => { setPart({ ...part, "qty_per": e.target.value }); }}
                    />


                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        id="qty_spare"
                        label="Quantity for Spare"
                        name="qty_spare"
                        autoFocus
                        value={spareQty}
                        onChange={(e) => { setSpareQty(e.target.value); updateQty(); }}
                    />

                </Grid>
                <Typography> Total number of parts: {part['order_qty']}</Typography>

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