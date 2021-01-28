import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = (theme: { spacing: { unit: any } }) => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
        color: "black",
        fontSize: 30,
        opacity: 1,
        borderBottom: 0,
        "&:before": {
            borderBottom: 0,
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

class EditableTextField extends React.Component {
    state = {
        email: "johndoe@domain.com",
        editMode: false,
        mouseOver: false,
    };

    handleChange = (event: { target: { name: any; value: any } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleMouseOver = () => {
        if (!this.state.mouseOver) {
            this.setState({ mouseOver: true });
        }
    };

    handleMouseOut = () => {
        // The problem is here!!!
        if (this.state.mouseOver) {
            this.setState({ mouseOver: false });
        }
    };

    handleClick = () => {
        this.setState({
            editMode: true,
            mouseOver: false,
        });
    };

    render() {
        // @ts-ignore
        const { classes, value } = this.props;

        return (
            <TextField
                name="email"
                defaultValue={value}
                margin="normal"
                error={this.state.email === ""}
                onChange={this.handleChange}
                disabled={!this.state.editMode}
                className={classes.textField}
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
                InputProps={{
                    classes: {
                        disabled: classes.disabled,
                    },
                    endAdornment: this.state.mouseOver ? (
                        <InputAdornment position="end">
                            <IconButton onClick={this.handleClick}>
                                <Edit />
                            </IconButton>
                        </InputAdornment>
                    ) : (
                        ""
                    ),
                }}
            />
        );
    }
}

// @ts-ignore
export default withStyles(styles)(EditableTextField);
