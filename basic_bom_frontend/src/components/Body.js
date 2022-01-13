import { Box, useTheme } from "@material-ui/core";
import PartList from "./PartList";

import axios from 'axios'


function Body() {
    const theme = useTheme();
    
    return (<>
        <Box width="95%">
            <PartList />
        </Box>
    </>)
}

export default Body;