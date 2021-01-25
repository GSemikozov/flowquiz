import { Client as FilestackClient } from "filestack-js/build/main/lib/client";

declare global {
    // eslint-disable-next-line
    interface Lang {
        get: (
            translationKey: string,
            params?: { [key: string]: unknown },
            locale?: string,
        ) => string;
        choice: (
            translationKey: string,
            count: number,
            params?: { [key: string]: unknown },
            locale?: string,
        ) => string;
    }
    const Lang: Lang;

    // eslint-disable-next-line
    interface Window {
        filestackClient?: FilestackClient;
        filestackSecurity?: { signature: string; policy: string };
    }
}
