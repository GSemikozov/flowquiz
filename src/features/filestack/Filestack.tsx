import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PickerFileMeta, useFilepicker } from "./useFilestack";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { quizItemUploadImageAsync, selectCurrentImageUrl } from "./filestackSlice";

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

export const FilestackPicker = () => {
    const [uploadedFile, setUploadedFile] = useState(initUploadedFileState); // TODO: get it by user's specific quiz from selector and display
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const currentImageUrl = useSelector(selectCurrentImageUrl);

    // TODO: use selectors
    // const imageUrl = useSelector(selectCurrentImageUrl);
    // const locale = useSelector(selectCurrentUserLocale);
    const locale = "en";

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateImage = useCallback((file) => {
        setUploadedFile(file);
    }, []);

    const onFilesLoad = useCallback(
        (files: PickerFileMeta[]) => {
            const file = files[0];
            updateImage(file);
            dispatch(quizItemUploadImageAsync(file.url));
            handleClose();
            setTimeout(() => {
                enqueueSnackbar("Image was successfully loaded", { variant: "success" });
            }, 1000);
        },
        [enqueueSnackbar, updateImage],
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

    useEffect(() => {
        console.log("uploaded files: ", uploadedFile);
    }, [uploadedFile]);

    useEffect(() => {
        console.log("currentImageUrl: ", currentImageUrl);
    }, [currentImageUrl]);

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Upload image
            </Button>
            <div>
                {uploadedFile && (
                    <img
                        src={uploadedFile.url}
                        alt={uploadedFile.filename}
                        style={{ maxWidth: "100%", marginTop: "20px" }}
                    />
                )}
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
