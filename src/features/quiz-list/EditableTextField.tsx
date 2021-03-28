import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect, useDispatch } from "react-redux";
import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import { InputBase } from "@material-ui/core";

const useStyles = makeStyles({
    textField: {
        minWidth: 240,
        maxWidth: "100%",
        color: "black",
        opacity: 1,
        borderBottom: 0,
        boxSizing: "border-box",
        "&:before": {
            borderBottom: "0 !important",
        },
    },
    disabled: {
        color: "black",
        borderBottom: 0,
        "&:before": {
            borderBottom: 0,
        },
    },
    btnIcons: {
        marginLeft: 10,
    },
});

const initFieldState = {
    text: "johndoe@domain.com",
    editMode: false,
};

export default function EditableTextField({
    value,
    name,
    fullWidth = false,
}: {
    value: any;
    name: any;
    fullWidth?: boolean;
}) {
    // const [fieldState, setFieldState] = useState(initFieldState);
    const [dbValue, saveToDb] = useState(""); // would be an API call normally
    const dispatch = useDispatch();
    const { handleChange, handleMouseOver, handleMouseOut, text, editMode } = useEditableText(
        value,
    );
    const classes = useStyles();

    useEffect(() => {
        console.log("dbValue", dbValue);
        // dispatch(updateTitleAction(dbValue))
    }, [dispatch, dbValue]);

    const debouncedSave = useRef(
        debounce((nextValue: string) => {
            saveToDb(nextValue);
        }, 500),
    ).current;

    const handleOnChange = (event: any) => {
        const { value: nextValue } = event.target;
        handleChange(event);
        debouncedSave(nextValue);
        // updateTitle();
    };

    return (
        <InputBase
            autoFocus
            name={name}
            defaultValue={value}
            // error={text === ""}
            onChange={(e) => {
                handleOnChange(e);
            }}
            disabled={!editMode}
            className={classes.textField}
            onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => handleMouseOut()}
            // onBlur={() => handleOnBlur()}
            // onFocus={e => {
            //     e.stopPropagation();
            //     handleOnFocus();
            // }}
            fullWidth={fullWidth}
            // InputProps={{
            //     classes: {
            //         disabled: classes.disabled,
            //     },
            // }}
        />
    );
}

// class EditableTextField extends React.Component {
//     state = {
//         text: "johndoe@domain.com",
//         editMode: false,
//         mouseOver: false,
//     };
//
//     handleChange = (event: { target: { name: any; value: any } }) => {
//         this.setState({ [event.target.name]: event.target.value });
//
//     };
//
//     handleMouseOver = () => {
//         if (!this.state.mouseOver) {
//             this.setState({
//                 mouseOver: true,
//                 editMode: true,
//             });
//         }
//     };
//
//     handleMouseOut = () => {
//         if (this.state.mouseOver) {
//             this.setState({
//                 mouseOver: false,
//                 editMode: false,
//             });
//         }
//     };
//
//     handleOnClick = () => {
//         this.setState({
//             editMode: true,
//         });
//     };
//
//     handleOnBlur = () => {
//         this.setState({
//             editMode: false,
//         });
//     };
//
//     handleOnFocus = () => {
//         this.setState({
//             editMode: true,
//         });
//     };
//
//     render() {
//         // @ts-ignore
//         const { classes, value, name, label, fullWidth, updateTitle } = this.props;
//
//         return (
//             <TextField
//                 autoFocus={true}
//                 autoComplete="off"
//                 name={name}
//                 label={label}
//                 defaultValue={value}
//                 error={this.state.text === ""}
//                 onChange={(e) => {
//                     this.handleChange(e);
//                     updateTitle();
//                 }}
//                 disabled={!this.state.editMode}
//                 className={classes.textField}
//                 onMouseEnter={this.handleMouseOver}
//                 onMouseLeave={this.handleMouseOut}
//                 onBlur={this.handleOnBlur}
//                 onFocus={e => {
//                     e.stopPropagation();
//                     this.handleOnFocus();
//                 }}
//                 onClick={e => {
//                     e.stopPropagation()
//                 }}
//                 fullWidth={fullWidth}
//                 InputProps={{
//                     classes: {
//                         disabled: classes.disabled,
//                     },
//                 }}
//             />
//         );
//     }
// }
//
// const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
//     updateTitle: () => {
//         dispatch({ type: "UPDATE_EDITABLE_TEXT" });
//     },
// });
//
// // @ts-ignore
// export default compose(
//     // @ts-ignore
//     withStyles(styles),
//     connect(
//         null,
//         mapDispatchToProps, // or put null here if you do not have actions to dispatch
//     ),
//     // @ts-ignore
// )(EditableTextField);
