import { Box, useTheme } from "@material-ui/core";
import { useState } from "react";
import PartList from "../pages/PartList";
import Navbar from './NavBar';

function Body(props) {
    
    const theme = useTheme();

    // Import Props
    const [currPage, setCurrPage] = useState("parts")

    const conditionalBody = () => {
        switch(currPage) {
            case "parts":
                return <PartList />
            default:
        }
    }
    
    return (<>
        <Navbar setPage={setCurrPage}/>
        <div>
            {currPage}
        </div>

        <Box width="95%">
            {conditionalBody()}
        </Box>
    </>)
}

export default Body;