import { Button, Paper, Typography, useTheme } from "@material-ui/core";
import { Dialog, DialogTitle } from "@material-ui/core";
import { Input, InputLabel, FormHelperText } from "@material-ui/core"
import { FormControl } from '@material-ui/core';

import FormInputDropdown from "./form/FormInputDropdown"
import FormInputRadio from "./form/FormInputRadio"



import { FormProvider, useForm } from "react-hook-form";


const defaultValues = {
    dropdownValue: "",
};

function AddPart(props) {
    const theme = useTheme();

    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue, watch } = methods;
    const onSubmit = (data) => console.log(data);

    const { addPart, onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Paper>



                <FormInputDropdown
                    name="dropdownValue"
                    control={control}
                    label="Dropdown Input"
                    options={[
                        {
                            "label": "option 1",
                            "value": 1,
                        },
                        {
                            "label": "option 2",
                            "value": 2,
                        },
                    ]}
                />

                <FormInputRadio
                    name={"radioValue"}
                    control={control}
                    label={"Radio Input"}
                    options={[
                        {
                            "label": "option 1",
                            "value": 1,
                        },
                        {
                            "label": "option 2",
                            "value": 2,
                        },
                    ]}
                />



                <FormControl>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input id="description-input" aria-describedby="Input a description of your part here" />

                    <InputLabel htmlFor="drawing">Description</InputLabel>
                    <Input id="description" aria-describedby="Input a description of your part here" />

                    {/* <FormHelperText id="my-helper-text">HELLO</FormHelperText> */}
                </FormControl>



                <DialogTitle id="simple-dialog-title">Add part</DialogTitle>
                <br />
                <Typography varient="h2" component="h2" gutterBottom>
                    Select what you would like to do, add up to 100 parts and then close the box
                </Typography>
                <br />
                <Button style={{ margin: theme.spacing(1) }} variant="contained" size="small" onClick={addPart} color="primary"> Add Part </Button>
                <Button style={{ margin: theme.spacing(1) }} variant="contained" size="small" onClick={handleClose} color="secondary"> Close </Button>
                <br />

            </Paper>


        </Dialog>
    );
}

export default AddPart;