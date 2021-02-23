import React, { memo, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { FilestackPicker } from "./features/filestack/Filestack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { QuizItemList } from "./features/quiz-list/QuizItemsList";
import { useDispatch, useSelector } from "react-redux";
import { getListSelector } from "./features/quiz-list/quizListSlice";
import { quizListItemType } from "./features/quiz-list/types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextMobileStepper from "./PreviewStepper";

const useStyles = makeStyles((theme) => ({
    label: {
        margin: 0,
        pointerEvents: "none",
    },
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

    const Preview = () => {
        const listData = useSelector(getListSelector);
        const dispatch = useDispatch();
        const [data, setData] = useState(listData);

        useEffect(() => {
            console.log("listData", listData);
            setData(listData);
        }, [dispatch, listData]);

        return <TextMobileStepper data={data} />;
    };

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
                                <Preview />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default App;
