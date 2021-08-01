import { Button, Typography, useTheme } from "@material-ui/core";
import { Dialog, DialogTitle } from "@material-ui/core";

function AddPart(props) {
    const theme = useTheme();
    
    const { addPart, onClose, open } = props;

    const handleClose = () => {
        onClose();
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="simple-dialog-title">Add part</DialogTitle>
            <br />
            <Typography varient="h2" component="h2" gutterBottom>
                Select what you would like to do, add up to 100 parts and then close the box
            </Typography>
            <br />
            <Button style={{margin: theme.spacing(1)}} variant="contained" size="small" onClick={addPart} color="primary"> Add Part </Button>
            <Button style={{margin: theme.spacing(1)}} variant="contained" size="small" onClick={handleClose} color="secondary"> Close </Button>
            <br/>
        </Dialog>
    );
}

export default AddPart;