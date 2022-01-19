import { Box, useTheme } from "@material-ui/core";
import { useState } from "react";
import BasicCRUD from "../components/BasicCRUD"
import Navbar from './NavBar';
import partParameters from "../data/partParameters";
import AddPart from "./AddPart";
import axios from 'axios'

function Body(props) {
    
    const theme = useTheme();

    // Import Props
    const [currPage, setCurrPage] = useState("parts")

    const conditionalBody = () => {
        switch(currPage) {
            case "parts":
                return <BasicCRUD 
                        fetchDataMethod={async () => { return await axios.get('/parts')}} 
                        itemParameters={partParameters}
                        addItemForm={<AddPart />} /> 
            // case "suppliers":
            //     return <BasicCRUD
            //             fetchDataMethod={async () => { return await axios.get('/suppliers')}}
            //             itemParameters={supplierParamaters}
            //             addItemForm={AddSupplier}
            //             />
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