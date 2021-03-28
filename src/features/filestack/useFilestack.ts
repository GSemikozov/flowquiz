import { useCallback, useEffect, useMemo } from "react";

import { PickerDisplayMode } from "filestack-js";
import { PickerResponse } from "filestack-js/build/main/lib/picker";
import { PickerFileMetadata } from "filestack-js/build/main/lib/picker";
import * as Sentry from "@sentry/react";

import { tryCatch } from "./helpers";
import { getClient } from "./helpers";
import { useSnackbar } from "notistack";

export const DEFAULT_FILEPICKER_ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
export const FILEPICKER_SUPPORTED_LANGUAGES = ["en"];
export const DEFAULT_FROM_SOURCES = ["local_file_system", "url", "webcam"];

const checkPickerLanguages = (lang: string) =>
    FILEPICKER_SUPPORTED_LANGUAGES.includes(lang) ? lang : "en";

const security = window.filestackSecurity;

const getFilePreview = tryCatch<PickerFileMetadata, string>({
    tryer: (file: any) =>
        file.source === "url" ? file.originalPath : URL.createObjectURL(file.originalFile),
    catcher: () => "",
});

export type PickerFileMeta = PickerFileMetadata & { previewUrl: string };

type UseFilepickerProps = {
    containerSelector: string;
    locale: string;
    immediate?: boolean;
    maxFiles: number;
    maxSize?: number;
    fromSources?: string[];
    onFilesLoad: (files: PickerFileMeta[]) => void;
    acceptedFormats?: string[];
};

export const useFilepicker = ({
    containerSelector,
    locale,
    immediate = false,
    maxFiles,
    maxSize = 10 * 1024 * 1024,
    onFilesLoad,
    fromSources = DEFAULT_FROM_SOURCES,
    acceptedFormats = DEFAULT_FILEPICKER_ACCEPTED_FORMATS,
}: UseFilepickerProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const client = useMemo(() => getClient(), []);

    const baseOptions = useMemo(
        () => ({
            fromSources,
            accept: acceptedFormats,
            // Add File blob to the originalFile
            exposeOriginalFile: true,
            lang: checkPickerLanguages(locale.substring(0, 2)),
            maxFiles,
            maxSize,
            transformations: {
                crop: true,
                circle: true,
                rotate: true,
            },
        }),
        [acceptedFormats, fromSources, locale, maxFiles, maxSize],
    );

    const prepareUploadedFiles = (files: PickerFileMetadata[]) =>
        /** Add security tokens to the image urls. Get info from window.filestackSecurity with policy and signature */
        files.map((file) => {
            const previewUrl = getFilePreview(file);

            return {
                ...file,
                url: !!security
                    ? `${file.url}?policy=${security.policy}&signature=${security.signature}`
                    : file.url,
                previewUrl,
            };
        });

    const uploadFile = useCallback(() => {
        const options = {
            ...baseOptions,
            container: containerSelector,
            displayMode: PickerDisplayMode.inline,
            disableTransformer: true, // edit mode disabled
            onUploadDone: ({ filesUploaded }: PickerResponse) => {
                console.log("Filestack upload done");
                onFilesLoad && onFilesLoad(prepareUploadedFiles(filesUploaded));
            },
            onFileUploadFailed: (files: PickerFileMetadata, error: Error) => {
                console.log("Filestack error: ", error);
                Sentry.captureException(error, {
                    extra: {
                        filestackResponse: error,
                    },
                });
                setTimeout(() => {
                    enqueueSnackbar("Error while uploading image", { variant: "error" });
                }, 1000);
            },
        };

        client?.picker(options).open();
    }, [baseOptions, client, onFilesLoad, containerSelector, enqueueSnackbar]);

    useEffect(() => {
        immediate && uploadFile();
    }, [uploadFile, immediate]);

    return { uploadFile, containerSelector };
};
