import React, { useCallback } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";

import { removeQuizListItem, duplicateQuizListItem } from "./quizListSlice";

const ITEM_HEIGHT = 48;

export const DropdownMenu = ({
    id,
    handleEditItem,
    handleDuplicateItem,
    handleRemoveItem,
}: {
    id: string;
    handleEditItem: () => void;
    handleDuplicateItem: () => void;
    handleRemoveItem: () => void;
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id={id}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                <MenuItem onClick={handleEditItem}>Rename</MenuItem>
                <MenuItem onClick={handleDuplicateItem}>Duplicate</MenuItem>
                <MenuItem onClick={handleRemoveItem}>Remove</MenuItem>
            </Menu>
        </div>
    );
};
