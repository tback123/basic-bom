import { Box } from "@material-ui/core";
import { useState } from "react";
import BasicCRUD from "../components/BasicCRUD"
import Navbar from './NavBar';
import partParameters from "../data/partParameters";
import supplierParameters from "../data/supplierParameters";
import locationParameters from "../data/locationParameters";
import materialParameters from "../data/materialParameters";
import AddPart from "./AddPart";
import AddSupplier from "./AddSupplier";
import AddLocation from "./AddLocation";
import axios from 'axios'

function Body(props) {

    // Import Props
    const [currPage, setCurrPage] = useState("parts")

    const conditionalBody = () => {

        switch (currPage) {
            case "parts":
                return <BasicCRUD
                    fetchDataMethod={async () => { return await axios.get('/parts') }}
                    itemParameters={partParameters}
                    addItemForm={<AddPart />}
                    currPage={currPage}
                />
            case "suppliers":
                return <BasicCRUD
                    fetchDataMethod={async () => { return await axios.get('/suppliers') }}
                    itemParameters={supplierParameters}
                    addItemForm={<AddSupplier />}
                    currPage={currPage}
                />
            case "locations":
                return <BasicCRUD
                    fetchDataMethod={async () => { return await axios.get('/locations') }}
                    itemParameters={locationParameters}
                    addItemForm={<AddLocation />}
                    currPage={currPage}
                />
            case "materials":
                return <BasicCRUD
                    fetchDataMethod={async () => { return await axios.get('/materials') }}
                    itemParameters={materialParameters}
                    addItemForm={<AddPart />}
                    currPage={currPage}
                />
            default:
        }
    }

    return (<>
        <Navbar setPage={setCurrPage} />
        <div>
            {currPage}
        </div>

        <Box width="95%">
            {conditionalBody()}
        </Box>
    </>)
}

export default Body;