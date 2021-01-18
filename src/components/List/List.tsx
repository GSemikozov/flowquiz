import React from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    flexGrow: 1,
  },
  paper: {
    height: 220,
    width: 340,
    backgroundColor: "#ebebeb",
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
}));

export const List = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.root} xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid key={1} item>
            <Paper className={classes.paper} elevation={2} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
