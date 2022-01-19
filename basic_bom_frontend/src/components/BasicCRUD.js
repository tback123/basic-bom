import { Box, Fab } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import { Alert } from "@material-ui/lab";
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import { Dialog } from "@material-ui/core";

function BasicCRUD(props) {
    const theme = useTheme();

    const { fetchDataMethod, itemParameters, addItemForm } = props

    const [loading, setLoading] = React.useState(true);
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [mainData, setMainData] = React.useState([])
    const [lastResponse, setLastResponse] = React.useState({});

    // Fetch the parts from the api with mainData as a dependency of useEffect
    // This will mean the part isn't infinantly updated
    // Resource: https://dmitripavlutin.com/react-useeffect-infinite-loop/

    const fetchMainData = async () => {

        // Clear the data before updating it
        setMainData([]);
        setLoading(true)

        await fetchDataMethod()
            .then(function (response) {
                // Handles Successful Request, loop through array and add each item to the main data
                response.data.forEach(part => {
                    addItem(part)
                });
                setLastResponse(response);
                setLoading(false)
            })
            .catch(function (error) {
                // Handles Error
                console.log(error)

            })

    };

    // Fetch part data every time the component loads
    // Use the length of the partState as the dependant variable
    useEffect((() => { 
        fetchMainData();
        // Note: the below line disables the warning given by useEffect and its dependancy list
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [lastResponse.dictionary]);

    // Opens the main add item dialogue
    const handleOpenAdd = () => {
        setIsAddOpen(true);
    };

    // Closes the add item dialogue, Takes in a bool of if the data should be refreshed
    const handleCloseAdd = (refresh) => {
        setIsAddOpen(false);
        if (refresh === true) {
            fetchMainData();
        }
    };

    // Add item to end of the list
    const addItem = (val) => {
        setMainData(prevPartsState => [...prevPartsState, val]);
    }

    return (<>

        {/* Loading Alert */}
        <Snackbar
            open={loading}
            message="Note archived"
            sx={{ minWidth: "300" }}
        >
            <Alert severity="info">
                <Box sx={{ width: '100%' }}>
                    Loading...
                    <LinearProgress sx={{ width: '100%' }} />
                </Box>
            </Alert>
        </Snackbar>

        <Box width="100%" height="100%">
            <DataGrid rows={mainData}
                columns={itemParameters}
                autoHeight='true'
                density="compact"
                checkboxSelection
                disableSelectionOnClick
                disableColumnMenu
                components={{
                    Toolbar: GridToolbar,
                }} />

            <Dialog onClose={handleCloseAdd} open={isAddOpen}>
                <div>
                    {React.cloneElement(addItemForm, {onClose: handleCloseAdd})}
                </div>
            </Dialog>

            <Fab color='primary'
                style={{ position: 'fixed', bottom: theme.spacing(3), right: theme.spacing(3), }}
                onClick={handleOpenAdd}>
                <AddIcon />
            </Fab>
        </Box>

    </>)
}

export default BasicCRUD;