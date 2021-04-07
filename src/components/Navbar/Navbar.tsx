import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import { ArrowBack, Visibility } from "@material-ui/icons";

export const Navbar = () => {
    const params = useParams();
    let history = useHistory();

    useEffect(() => {
        console.log("params", params);
    }, []);
    return (
        <AppBar color="default">
            <Toolbar style={{ justifyContent: "space-between" }}>
                {history.location.pathname === "/" ? (
                    <Typography
                        variant="h6"
                        style={{ display: "flex", alignItems: "center", fontWeight: "initial" }}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "8px" }}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24.8786 23.6013C28.0087 19.7199 30 15.0151 30 11.4564C30 9.71042 29.579 8.48142 28.9524 7.57711C28.318 6.66149 27.3695 5.93037 26.0797 5.36203C23.4197 4.18996 19.6796 3.86426 15.5493 3.86426C11.6992 3.86426 8.25948 4.82449 5.83948 6.58438C3.48776 8.29461 2 10.8183 2 14.3265C2 18.0259 3.42229 22.0175 5.79133 25.0641C8.16025 28.1106 11.2925 30.0002 14.6479 30.0002C17.8874 30.0002 21.7127 27.5269 24.8786 23.6013ZM14.6479 32.0002C22.9451 32.0002 32 19.7991 32 11.4564C32 3.11373 23.8465 1.86426 15.5493 1.86426C7.25206 1.86426 0 5.98382 0 14.3265C0 22.6691 6.35065 32.0002 14.6479 32.0002Z"
                                fill="#A8D1E7"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M27.0953 23.6595C28.932 21.4393 30 18.2262 30 14.4133C30 11.0794 28.0507 8.0102 24.9107 5.68923C21.7723 3.36949 17.6897 2 14.0177 2C10.448 2 8.10498 3.28297 6.59066 5.28674C5.01122 7.37669 4.15381 10.494 4.15381 14.4133C4.15381 17.849 5.94585 21.022 8.80825 23.3945C11.677 25.7722 15.4661 27.2039 19.0915 27.2039C22.6406 27.2039 25.2936 25.8376 27.0953 23.6595ZM19.0915 29.2039C27.3333 29.2039 32 22.7486 32 14.4133C32 6.07796 22.2594 0 14.0177 0C5.77587 0 2.15381 6.07796 2.15381 14.4133C2.15381 22.7486 10.8497 29.2039 19.0915 29.2039Z"
                                fill="#374785"
                            />
                        </svg>
                        Flowquiz
                    </Typography>
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack color="action" />}
                        onClick={history.goBack}
                    >
                        Back
                    </Button>
                )}
                <nav>
                    <Link
                        to="/create"
                        style={{
                            textDecoration: "none",
                            color: history.location.pathname === "/create" ? "#5469D4" : "inherit",
                            marginLeft: "20px",
                        }}
                    >
                        Create
                    </Link>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "initial", marginLeft: "20px" }}
                    >
                        Connect
                    </Link>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "initial", marginLeft: "20px" }}
                    >
                        Share
                    </Link>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "initial", marginLeft: "20px" }}
                    >
                        Results
                    </Link>
                </nav>
                <nav>
                    <Button variant="outlined" startIcon={<Visibility color="action" />}>
                        Preview
                    </Button>
                    <Button variant="outlined" style={{ marginLeft: "8px" }}>
                        Publish
                    </Button>
                </nav>
            </Toolbar>
        </AppBar>
    );
};
