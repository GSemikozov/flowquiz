import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PickerFileMeta, useFilepicker } from "./useFilestack";
import { useSnackbar } from "notistack";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { quizItemUploadImageAsync } from "./filestackSlice";
import { getCurrentListItemSelector } from "../quiz-list/quizListSlice";

const initUploadedFileState = {
    filename: "",
    handle: "",
    mimetype: "",
    originalPath: "",
    previewUrl: "",
    size: null,
    source: "",
    status: "",
    uploadId: "",
    url: "",
};

export const FilestackPicker = ({
    open,
    toggle,
    listItemId,
}: {
    open: boolean;
    toggle: () => void;
    listItemId: string;
}) => {
    // const [open, setOpen] = useState(false);
    // const [updatedImage, setUpdatedImage] = useState(""); // TODO: rm if not needed.
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const listItem = useSelector(getCurrentListItemSelector(listItemId));
    const currentImageUrl = listItem?.imageUrl || "";
    const [uploadedFile, setUploadedFile] = useState({
        ...initUploadedFileState,
        url: "", // tempo hide, TODO: multiple load
    });

    // TODO: use selectors
    // const locale = useSelector(selectCurrentUserLocale);
    const locale = "en";

    // const handleOpen = () => {
    //     toggle();
    // };

    const handleClose = useCallback(() => {
        toggle();
    }, [toggle]);

    const updateImage = useCallback((file) => {
        setUploadedFile(file);
    }, []);

    const onFilesLoad = useCallback(
        (files: PickerFileMeta[]) => {
            const file = files[0];
            updateImage(file);
            dispatch(quizItemUploadImageAsync({ quizItemImageUrl: file.url, listItemId }));
            handleClose();
            setTimeout(() => {
                enqueueSnackbar("Image was successfully loaded", { variant: "success" });
            }, 1000);
        },
        [enqueueSnackbar, updateImage, handleClose, listItemId, dispatch],
    );

    const { containerSelector } = useFilepicker({
        maxFiles: 1,
        onFilesLoad,
        locale,
        fromSources: ["unsplash", "local_file_system", "url", "webcam"],
        acceptedFormats: ["image/jpeg", "image/png", "image/jpg"],
        containerSelector: "test",
        immediate: true,
    });

    // useEffect(() => {
    //     console.log("uploaded files: ", uploadedFile);
    //     setUpdatedImage(uploadedFile.previewUrl || currentImageUrl);
    // }, [uploadedFile]);

    useEffect(() => {
        console.log("currentImageUrl: ", currentImageUrl);
    }, [currentImageUrl]);

    // useEffect(() => {
    //     setUpdatedImage(currentImageUrl);
    // }, []);

    useEffect(() => {
        console.log("Filestack RERENDER");
    }, []);

    const ThumbImg = () =>
        useMemo(
            () => (
                <img
                    src={currentImageUrl}
                    alt={uploadedFile.filename}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "5px",
                        overflow: "hidden",
                    }}
                />
            ),
            [],
        );

    // const MemoizedImg = React.memo(ThumbImg);

    return (
        <div>
            {/*<Button variant="outlined" color="primary" onClick={handleOpen}>*/}
            {/*    Upload image*/}
            {/*</Button>*/}
            <div>
                {/*<MemoizedImg*/}
                {/*    uploadedFile={uploadedFile}*/}
                {/*    updatedImage={updatedImage}*/}
                {/*/>*/}
                <ThumbImg />
            </div>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar style={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            &#8592;
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div style={{ height: "100%" }} id={containerSelector} />
            </Dialog>
        </div>
    );
};
