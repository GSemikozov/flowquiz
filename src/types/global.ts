import { Client as FilestackClient } from "filestack-js/build/main/lib/client";

declare global {
    // eslint-disable-next-line
    interface Window {
        filestackClient?: FilestackClient;
        filestackSecurity?: { signature: string; policy: string };
    }
}
