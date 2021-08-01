import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  useTheme
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";


function Navbar(props) {
  const theme = useTheme();

  return (
      <AppBar position="static" color="primary">
        <Toolbar >
          <IconButton
            edge="start"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            A Basic Bill of Materials
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;