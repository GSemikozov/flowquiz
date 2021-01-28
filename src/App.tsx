import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { FilestackPicker } from "./features/filestack/Filestack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { QuizItemList } from "./features/quiz-list/QuizItemsList";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: `88px`,
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
            <main className={classes.root}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Paper style={{ padding: "20px" }}>
                                <h3>Edit options</h3>
                                <FilestackPicker />
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{ padding: "20px" }}>
                                <h3>Question</h3>
                                <QuizItemList />
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{ padding: "20px" }}>
                                <h3>Answer</h3>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default App;
