import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6">React and Material-UI App</Typography>
      </Toolbar>
    </AppBar>
  );
};
