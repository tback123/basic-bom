import { Box, useTheme } from "@material-ui/core";
import PartList from "./PartList";


function Body() {
    const theme = useTheme();
    return (<>
        <Box width="95%">
            <PartList />
        </Box>
    </>)
}

export default Body;