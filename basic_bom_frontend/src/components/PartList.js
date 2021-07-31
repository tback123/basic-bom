import { List, Divider, Box } from "@material-ui/core";
import Part from "./Part"

function PartList() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (<>
        <Box display="flex" >
            <List style={{ margin: 'auto' }}>
                <Divider />

                {list.map((value, index) => (
                    <Part id={value}/>
                ))}
            </List>
        </Box>

    </>)
}

export default PartList;