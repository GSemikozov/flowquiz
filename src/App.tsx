import React from "react";
import { Navbar } from "./components/Navbar/Navbar";

import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {
  const classes = useStyles();

  // const handleChange = (event: any) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
