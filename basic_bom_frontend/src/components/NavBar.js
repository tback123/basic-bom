import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import { useState } from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import ExtensionIcon from '@mui/icons-material/Extension';
import PlaceIcon from '@mui/icons-material/Place';
import StoreIcon from '@mui/icons-material/Store';
import BlurOnIcon from '@mui/icons-material/BlurOn';

function Navbar(props) {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const { setPage } = props;

  const toggleNavBar = () => {
    setIsNavOpen(!isNavOpen);
  }

  const updatePage = (selectedPage) => {
    console.log(selectedPage);
    setPage(selectedPage);
  }

  const list = () => (
    <Box
      sx={{ width:  250 }}
      role="presentation"
    >
      <List>
        <ListItem key="Title">
          <ListItemText primary="Navigation" />
        </ListItem>

      </List>

      <Divider />

      <List>
        <ListItemButton onClick={() => {updatePage("parts")}}>
          <ListItemIcon >
            <ExtensionIcon />
          </ListItemIcon>
          <ListItemText primary="Parts List" />
        </ListItemButton>


        <ListItemButton onClick={() => {updatePage("suppliers")}}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItemButton>

        <ListItemButton onClick={() => {updatePage("locations")}}>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="Locations" />
        </ListItemButton>

        <ListItemButton onClick={() => {updatePage("materials")}}>
          <ListItemIcon>
            <BlurOnIcon />
          </ListItemIcon>
          <ListItemText primary="Materials" />
        </ListItemButton>

      </List>

      <Box mt={3} position="absolute" bottom="0px">
        <List mt={5} >
          <ListItem>
            <ListItemText>Software written by Tom Killingback. github.com/tback123
            </ListItemText>
          </ListItem>

        </List>
      </Box>

    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar >
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleNavBar}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            A Basic Bill of Materials
          </Typography>
        </Toolbar>



      </AppBar>

      <Drawer
        open={isNavOpen}
        onClose={toggleNavBar}
      >
        {list("left")}
      </Drawer>
    </>
  );
};

export default Navbar;