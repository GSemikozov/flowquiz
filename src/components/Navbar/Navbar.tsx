import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getListSelector } from "../../features/quiz-list/quizListSlice";

export const Navbar = () => {
    const list = useSelector(getListSelector);

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6">React and Material-UI App</Typography>
                <div style={{ flexGrow: 1 }} />
                <nav>
                    <Link to="/" style={{ color: "#fff", marginLeft: "20px" }}>
                        Home
                    </Link>
                    {list.map((item) => (
                        <Link
                            key={item.id}
                            to={`/edit/${item.id}`}
                            style={{ color: "#fff", marginLeft: "20px" }}
                        >
                            {item.title.text}
                        </Link>
                    ))}
                </nav>
            </Toolbar>
        </AppBar>
    );
};
