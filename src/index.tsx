import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { initSentry } from "./services/sentry/sentry";
import { SnackbarProvider } from "notistack";

initSentry({
    dsn: "https://ddb501c2d40e4a55842b80dc677ec4fa@o508217.ingest.sentry.io/5600418",
}); // TODO: state.app.config.sentry - put dsn and env there

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
