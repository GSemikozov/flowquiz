import React, { useCallback, useState } from "react";
import { Button, FormControl } from "@material-ui/core";
import EditableTextField from "./EditableTextField";
import DetailedAccordion from "./DetailedAccordion";

export const QuizItem = ({ onClick, completed }: { onClick: () => void; completed: boolean }) => {
    return (
        <div style={{ marginBottom: "40px" }}>
            <form noValidate autoComplete="off">
                <FormControl fullWidth={true}>
                    {/*<span onClick={onClick} style={{color: completed ? "green" : "none"}}>Check</span>*/}
                    <EditableTextField value="Your question" />
                    {/*<Button variant="outlined" color="primary" type="submit">Сохранить</Button>*/}
                </FormControl>
            </form>
            <div style={{ textAlign: "left" }}>
                <DetailedAccordion />
            </div>
        </div>
    );
};
