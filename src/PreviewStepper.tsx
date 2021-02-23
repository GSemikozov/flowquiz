import React, { memo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 400,
        flexGrow: 1,
    },
    label: {
        margin: 0,
        pointerEvents: "none",
    },
    header: {
        display: "flex",
        alignItems: "center",
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    content: {
        height: 255,
        maxWidth: 400,
    },
    img: {
        overflow: "hidden",
        display: "block",
        width: "100%",
    },
}));

const QuestionItem = (question: any) => {
    const classes = useStyles();

    return (
        <Grid container alignItems="center">
            <Grid item key={question.id}>
                <FormControlLabel
                    key={question.id}
                    value={`${question.title}${question.id}`}
                    control={<Radio />}
                    label=""
                    onBlur={(e) => e.preventDefault()}
                    className={classes.label}
                    checked={question.isTrue}
                />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
                <Typography align="left">{question.title}</Typography>
            </Grid>
        </Grid>
    );
};

export default function PreviewStepper({ data }: any) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = data.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
                <Typography>{data[activeStep].title}</Typography>
            </Paper>
            {/*<img*/}
            {/*    className={classes.img}*/}
            {/*    src={data[activeStep].imgPath}*/}
            {/*    alt={data[activeStep].title}*/}
            {/*/>*/}
            <div className={classes.content}>
                {data[activeStep].questions &&
                    data[activeStep].questions.map((question: any) => (
                        <Grid container alignItems="center">
                            <Grid item key={question.id}>
                                <FormControlLabel
                                    key={question.id}
                                    value={`${question.title}${question.id}`}
                                    control={<Radio />}
                                    label=""
                                    onBlur={(e) => e.preventDefault()}
                                    className={classes.label}
                                    checked={question.isTrue}
                                />
                            </Grid>
                            <Grid item style={{ flexGrow: 1 }}>
                                <Typography align="left">{question.title}</Typography>
                            </Grid>
                        </Grid>
                    ))}
            </div>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    );
}
