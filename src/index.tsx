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
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { CreatePage } from "./components/CreatePage";

initSentry({
    dsn: "https://ddb501c2d40e4a55842b80dc677ec4fa@o508217.ingest.sentry.io/5600418",
}); // TODO: state.app.config.sentry - put dsn and env there

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact={true} path="/edit/:id">
                        <App />
                    </Route>
                    <Route exact={true} path="/create">
                        <CreatePage />
                    </Route>
                    <Route exact={true} path="/">
                        <div style={{ marginTop: "100px", textAlign: "center" }}>Home</div>
                    </Route>
                    <Route exact={false} path="/">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
