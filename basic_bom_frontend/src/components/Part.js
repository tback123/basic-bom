import { ListItem, Divider} from "@material-ui/core";

function Part(props) {

    return (
        <>
            <ListItem>
                <p>Part number {props.id}</p>
            </ListItem >
            <Divider />
        </>
    )
}

export default Part;