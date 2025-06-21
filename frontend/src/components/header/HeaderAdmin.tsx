import { AppBar, Toolbar, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const headerStyles = {
  background: 'black',
  color: 'white',
  padding: 10,
};

const HeaderAdmin = () => {

  return (
    <AppBar position="sticky" style={headerStyles}>
      <Toolbar>
        <Grid container justifyContent="space-evenly">
          <Link to="/dashboard/game" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Gestión de juegos</Typography>
          </Link>
          <Link to="/dashboard/provider" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Gestión de proveedores</Typography>
          </Link>
          <Link to="/dashboard/user" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Gestión de usuarios</Typography>
          </Link>
          <Link to="/dashboard/purchase" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Gestión de compras</Typography>
          </Link>
          <Link to="/dashboard/sale" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Gestión de ventas</Typography>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAdmin;
