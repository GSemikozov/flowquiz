import React, { useCallback, useEffect, useState } from "react";
// import { FilestackPicker } from "./features/filestack/Filestack";
import Grid from "@material-ui/core/Grid";

import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Switch,
} from "@material-ui/core";
import { QuizItemList } from "./features/quiz-list/QuizItemsList";
import { useDispatch, useSelector } from "react-redux";
import {
    closeAllAnswerFields,
    getCurrentListItemSelector,
    openAllAnswerFields,
    toggleTitle,
    removeQuizListItemImg,
} from "./features/quiz-list/quizListSlice";
import { Close } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { useParams } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { FilestackPicker } from "./features/filestack/Filestack";
import ImageIcon from "@material-ui/icons/Image";
import { DndList } from "./features/quiz-list/DndList";

const drawerWidth = 320;

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
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        textAlign: "left",
        [theme.breakpoints.up("sm")]: {
            // top: theme.mixins.toolbar.minHeight,
            zIndex: 1099,
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        // [theme.breakpoints.up('sm')]: {
        //     width: `calc(100% - ${drawerWidth * 2}px)`,
        //     marginLeft: drawerWidth,
        //     marginRight: drawerWidth,
        // },
    },
}));

export const SwitchAnswers = () => {
    let { id } = useParams();
    // const currentItemOptions = useSelector(getCurrentListItemOptionsSelector(id));
    // const isOpened = !!currentItemOptions?.questions.find((question) => question.isOpen);
    const [checked, setChecked] = useState(false);

    const handleToggle = useCallback(() => {
        setChecked((prev) => !prev);
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("ID CHANGED IN SWITCH - SET to FALSE INITIALLY", id);
        setChecked(false);
    }, [id]);

    useEffect(() => {
        checked ? dispatch(openAllAnswerFields(id)) : dispatch(closeAllAnswerFields(id));
    }, [checked, id, dispatch]);

    return (
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
            <ListItem>
                <ListItemText id="switch-list-label" primary="Set answers" />
                <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        onChange={handleToggle}
                        checked={checked}
                        inputProps={{ "aria-labelledby": "switch-list-label" }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    );
};

export const SwitchTitle = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const item = useSelector(getCurrentListItemSelector(id));
    const isTitleVisible = !!item?.title.isVisible;

    const [checked, setChecked] = useState(true);

    const handleToggle = useCallback(() => {
        setChecked((prev) => !prev);
        dispatch(toggleTitle(id));
    }, [id, dispatch]);

    useEffect(() => {
        // console.log("ID CHANGED IN SWITCH TITLE - isTitleVisible", isTitleVisible);
        setChecked(isTitleVisible);
    }, [isTitleVisible]);

    return (
        <List subheader={<ListSubheader>Switch title</ListSubheader>}>
            <ListItem>
                <ListItemText id="switch-list-label" primary="Display title" />
                <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        onChange={handleToggle}
                        checked={checked}
                        inputProps={{ "aria-labelledby": "switch-list-label" }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    );
};

export const UploadImage = () => {
    let { id } = useParams();
    const [open, setOpen] = useState(false); // filepicker
    const item = useSelector(getCurrentListItemSelector(id));
    const isImg = !!item?.imageUrl;

    const dispatch = useDispatch();

    const handleRemoveImage = useCallback(() => {
        dispatch(removeQuizListItemImg({ quizListItemId: id }));
    }, [dispatch, id]);

    useEffect(() => {
        // console.log("RENDERED ITSELF WITHOUT PROPS");
    }, []);

    return (
        <List subheader={<ListSubheader>Upload image</ListSubheader>}>
            <ListItem style={{ paddingRight: "72px" }}>
                {!isImg && (
                    <IconButton onClick={() => setOpen((prev) => !prev)}>
                        <ImageIcon />
                    </IconButton>
                )}
                <ListItemText id="switch-list-label">
                    <FilestackPicker
                        listItemId={id}
                        open={open}
                        toggle={() => setOpen((prev) => !prev)}
                    />
                </ListItemText>
                {isImg && (
                    <ListItemSecondaryAction>
                        <IconButton onClick={handleRemoveImage}>
                            <Close />
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </ListItem>
        </List>
    );
};

// @ts-ignore
const DrawerContainer = ({ window, anchor, children }) => {
    const classes = useStyles();
    // const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const isDesktop = useMediaQuery("(min-width:600px)");

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                container={container}
                variant={!isDesktop ? "temporary" : "permanent"}
                open={!isDesktop ? mobileOpen : true} //
                anchor={anchor}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {isDesktop && <div className={classes.toolbar} />}
                {children}
            </Drawer>
        </>
    );
};

const SettingsSidebar = ({ window }: { window: any }) => (
    <DrawerContainer window={window} anchor="right">
        <UploadImage />
        <Divider />
        <SwitchTitle />
        <Divider />
        <SwitchAnswers />
        <Divider />
    </DrawerContainer>
);

const NavigationSidebar = ({ window }: { window: any }) => {
    return (
        <DrawerContainer window={window} anchor="left">
            <DndList />
        </DrawerContainer>
    );
};

const App = (props: any) => {
    const classes = useStyles();
    const { window } = props;

    useEffect(() => {
        console.log("App was RERENDERED", SettingsSidebar);
    }, []);

    return (
        <div className="App">
            <main className={classes.root}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={1} sm={2} md={3}>
                            <NavigationSidebar window={window} />
                        </Grid>
                        <Grid item xs={11} sm={10} md={9}>
                            <div className={classes.content}>
                                <QuizItemList />
                            </div>
                        </Grid>
                        {/*<Grid item xs={1} sm={2} md={3}>*/}
                        {/*    <SettingsSidebar window={window} />*/}
                        {/*</Grid>*/}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default App;
