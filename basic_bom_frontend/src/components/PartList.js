import { Box, Fab } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import AddPart from "./AddPart"
import parts from "../data/parts";
import partParameters from "../data/partParameters";
import axios from 'axios';

function PartList(props) {
    const theme = useTheme();
    const axios = require('axios')
    axios.defaults.baseURL = 'http://localhost:3000/api/v1';
    const [loading, setLoading] = React.useState(false);
    const [isAddPartOpen, setIsAddPartOpen] = React.useState(false);
    const [partsState, setPartsState] = React.useState([])
    const [counter, setCounter] = React.useState(0)

    // Fetch the parts from the api with partsState as a dependency of useEffect
    // This will mean the part isn't infinantly updated
    // Resource: https://dmitripavlutin.com/react-useeffect-infinite-loop/

    const fetchPartData = () => {
        const getParts = axios.get('/parts');
        axios.all([getParts]).then(
            axios.spread((partsResponse) => {
                return (
                    partsResponse.data.parts
                );
            })
        );
    };

    useEffect((() => { fetchPartData() }), partsState);

    const handleOpenAdd = () => {
        setIsAddPartOpen(true);
    };

    const handleCloseAdd = () => {
        setIsAddPartOpen(false);
    };

    const addPart = (val) => {
        setPartsState(partsState.concat({
            id: 100 - counter,
            bom_tree: "test",
            dept: "Test",
            subsystem: "test"

        }))
        setCounter(counter+1)
    }

    return (<>
        <Box width="100%" height="100%">
            <DataGrid rows={partsState}
                columns={partParameters}
                autoHeight='true'
                checkboxSelection
                disableSelectionOnClick />
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