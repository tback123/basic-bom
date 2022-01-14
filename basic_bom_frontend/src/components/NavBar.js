import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
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

import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExtensionIcon from '@mui/icons-material/Extension';
import PlaceIcon from '@mui/icons-material/Place';
import StoreIcon from '@mui/icons-material/Store';
import BlurOnIcon from '@mui/icons-material/BlurOn';

import { spacing } from '@mui/system';


function Navbar(props) {
  const theme = useTheme();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavOpen(!isNavOpen);
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
        <ListItem key="test">
          <ListItemText primary="Navigation" />
        </ListItem>

      </List>

      <Divider />

      <List>
        <ListItem button key="Parts List">
          <ListItemIcon>
            <ExtensionIcon />
          </ListItemIcon>
          <ListItemText primary="Parts List" />
        </ListItem>


        <ListItem button key="Suppliers">
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>

        <ListItem button key="Locations">
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="Locations" />
        </ListItem>

        <ListItem button key="Materials">
          <ListItemIcon>
            <BlurOnIcon />
          </ListItemIcon>
          <ListItemText primary="Materials" />
        </ListItem>

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
        anchor={'left'}
        open={isNavOpen}
        onClose={toggleNavBar}
      >
        {list("left")}
      </Drawer>
    </>
  );
};

export default Navbar;