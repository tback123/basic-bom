import { Box, Fab } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import AddPart from "./AddPart"

import parts from "../data/parts";
import partParameters from "../data/partParameters";

function PartList() {
    const theme = useTheme();

    const [isAddPartOpen, setIsAddPartOpen] = React.useState(false);
    const [partsState, setPartsState] = React.useState(parts)
    const [counter, setCounter] = React.useState(0)

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