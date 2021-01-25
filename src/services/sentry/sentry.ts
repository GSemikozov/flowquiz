import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export type SentryType = {
    dsn: string | null;
    env?: string;
};

export const initSentry = ({ dsn, env }: SentryType) => {
    dsn &&
        Sentry.init({
            dsn,
            integrations: [new Integrations.BrowserTracing()],
            ...(env && { environment: env, defaultIntegrations: false }),
            // We recommend adjusting this value in production, or using tracesSampler
            // for finer control
            tracesSampleRate: 0.02,
        });
};

export const captureMessage = (error: string) => {
    console.error(error); // eslint-disable-line no-console
    Sentry.captureMessage(error);
};
