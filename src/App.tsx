import React, { useEffect } from "react";
import { Navbar } from "./components/Navbar/Navbar";
// import { FilestackPicker } from "./features/filestack/Filestack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Switch,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core";
import { QuizItemList } from "./features/quiz-list/QuizItemsList";
import { useDispatch, useSelector, useStore } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import {
    closeAllAnswerFields,
    getListSelector,
    openAllAnswerFields,
    setListItemActive,
} from "./features/quiz-list/quizListSlice";
import { quizListItemType } from "./features/quiz-list/types";
import { selectActiveTab, setActiveTab } from "./features/quiz-navigation/quizNavigationSlice";
// import TextMobileStepper from "./PreviewStepper";

const useStyles = makeStyles((theme) => ({
    label: {
        margin: 0,
        pointerEvents: "none",
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: `88px`,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const listData = useSelector(getListSelector);
    const activeTab = useSelector(selectActiveTab);

    const handleTabChange = (event: any, newValue: any) => {
        setValue(newValue);
        // dispatch(setListItemActive(newValue));
        dispatch(setActiveTab(newValue));
    };

    const handleChange = () => {
        setState((prev) => !prev);
    };

    useEffect(() => {
        state ? dispatch(openAllAnswerFields()) : dispatch(closeAllAnswerFields());
    }, [state, dispatch]);

    useEffect(() => {
        setValue(activeTab);
    }, []);

    return (
        <div className="App">
            <Navbar />
            <main className={classes.root}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Typography>Sidenav</Typography>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={(e, value) => handleTabChange(e, value)}
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
                            >
                                {listData &&
                                    listData.map((item, idx) => (
                                        <Tab key={item.id} label={item.title} {...a11yProps(idx)} />
                                    ))}
                            </Tabs>
                        </Grid>
                        <Grid item xs={6}>
                            <QuizItemList />
                        </Grid>
                        <Grid item xs={3}>
                            <Paper style={{ textAlign: "left", paddingLeft: "20px" }}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch checked={state} onChange={handleChange} />
                                            }
                                            label="Set answers"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default App;
