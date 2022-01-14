import { Box, Fab } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import AddPart from "../components/AddPart"
import partParameters from "../data/partParameters";
import axios from 'axios';
import { Alert } from "@material-ui/lab";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';

function PartList(props) {
    const theme = useTheme();

    const [loading, setLoading] = React.useState(true);
    const [isAddPartOpen, setIsAddPartOpen] = React.useState(false);
    const [partsState, setPartsState] = React.useState([])
    const [lastResponse, setLastResponse] = React.useState({});

    // Fetch the parts from the api with partsState as a dependency of useEffect
    // This will mean the part isn't infinantly updated
    // Resource: https://dmitripavlutin.com/react-useeffect-infinite-loop/

    const fetchPartData = () => {

        setPartsState([]);

        axios.get('/parts')
            .then(function (response) {
                // Handles Successful Request
                // console.log(response)
                response.data.forEach(part => {
                    console.log("adding part")
                    addPart(part)
                });
                setLastResponse(response);
                setLoading(false)
            })
            .catch(function (error) {
                // Handles Error
                console.log(error)

            })
            .then(function () {
                // Always Executed
            })

        console.log(partsState)

    };

    // Fetch part data every time the component loads
    // Use the length of the partState as the dependant variable
    useEffect((() => { fetchPartData() }), [lastResponse.dictionary]);

    const handleOpenAdd = () => {
        setIsAddPartOpen(true);
    };

    const handleCloseAdd = (refresh) => {
        setIsAddPartOpen(false);
        if (refresh === true) {
            fetchPartData();
        }
    };

    const addPart = (val) => {

        setPartsState(prevPartsState => [...prevPartsState, val]);

    }

    return (<>
        {/* Loading Alert */}
        <Snackbar
            open={loading}
            message="Note archived"
            sx={{minWidth: "300"}}
        >
            <Alert severity="info">
                <Box sx={{ width: '100%' }}>
                    Loading...
                    <LinearProgress sx={{ width: '100%' }} />
                </Box>
            </Alert>
        </Snackbar>

        <Box width="100%" height="100%">
            <DataGrid rows={partsState}
                columns={partParameters}
                autoHeight='true'
                density="compact"
                checkboxSelection
                disableSelectionOnClick
                disableColumnMenu
                components={{
                    Toolbar: GridToolbar,
                }} />
            <AddPart addPart={addPart} open={isAddPartOpen} onClose={handleCloseAdd} />
            <Fab color='primary'
                style={{ position: 'fixed', bottom: theme.spacing(3), right: theme.spacing(3), }}
                onClick={handleOpenAdd}>
                <AddIcon />
            </Fab>
        </Box>

    </>)
}

export default PartList;