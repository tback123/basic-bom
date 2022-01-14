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


function Navbar(props) {
  const theme = useTheme();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavOpen(!isNavOpen);
  }

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
        hi
      </Drawer>
    </>
  );
};

export default Navbar;