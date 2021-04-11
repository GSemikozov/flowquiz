import React, { useCallback, useEffect, useState, CSSProperties } from "react";
import {
    List,
    ListItem,
    ListItemText,
    // ListItemIcon,
    IconButton,
    // ListItemSecondaryAction,
    Collapse,
    makeStyles,
    ListItemIcon,
} from "@material-ui/core";
// import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import InboxIcon from "@material-ui/icons/Inbox";
// import EditIcon from "@material-ui/icons/Edit";
import { ExpandMore, Help, NavigateNext } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListSelector, updateQuizListItem } from "./quizListSlice";
import { QuizNavEditableTitle } from "../quiz-navigation/QuizNavEditableTitle";

// fake data generator
// const getItems = count =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k}`,
//         primary: `item ${k}`,
//         secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined
//     }));
//
// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    console.log("REORDER", result);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",
    // styles we need to apply on draggables
    ...draggableStyle,
    ...(isDragging && {
        background: "rgb(235,235,235)",
    }),
});

const getListStyle = (isDraggingOver: any) =>
    ({
        pointerEvents: isDraggingOver ? "none" : "auto", // TODO: handle in future if need
    } as CSSProperties);

const useStyles = makeStyles((theme) => ({
    root: {},
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const SubItemsList = React.memo(({ subItems, id }: { subItems: any; id: any }) => {
    const classes = useStyles();

    // @ts-ignore
    return subItems.map((item: any, index: number) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <List disablePadding style={getListStyle(snapshot.draggingOver)}>
                    <ListItem
                        button={true}
                        className={`${classes.listItem} ${classes.nested}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                        <ListItemIcon style={{ minWidth: "32px" }}>
                            <Help color="action" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to={`/quiz/edit/${item.id}`} style={{ textDecoration: "none" }}>
                                <QuizNavEditableTitle
                                    title={item.title.text}
                                    id={id}
                                    quizListItemId={item.id}
                                    isChapter={false}
                                />
                            </Link>
                        </ListItemText>
                    </ListItem>
                    {/*{provided.placeholder}*/}
                </List>
            )}
        </Draggable>
    ));
});

// @ts-ignore
function SubItem({ subItems, id, open }) {
    return (
        <Collapse in={open} timeout="auto">
            <Droppable droppableId={id} type={`droppableSubItem`}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                        <SubItemsList subItems={subItems} id={id} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Collapse>
    );
}

// @ts-ignore
function Item({ item, index }) {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const { id } = useParams();

    const handleClick = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        console.log("1. !!!", id, item);
    }, [item, id]);

    return (
        <Draggable
            draggableId={item.id}
            index={index}
            // disableInteractiveElementBlocking={true}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                    <ListItem
                        button={true}
                        className={classes.listItem}
                        style={{ background: id === item.id ? "#e3e7eb" : "#fff" }}
                    >
                        <ListItemIcon style={{ minWidth: "32px" }}>
                            <IconButton onClick={handleClick}>
                                {open ? <ExpandMore /> : <NavigateNext />}
                            </IconButton>
                        </ListItemIcon>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Link
                                to={`/quiz/edit/${item.id}`}
                                style={{ marginRight: "10px", textDecoration: "none" }}
                            >
                                <QuizNavEditableTitle
                                    title={item.title}
                                    id={item.id}
                                    isChapter={true}
                                />
                            </Link>
                        </div>
                        {/*<ListItemSecondaryAction>*/}
                        {/*    */}
                        {/*</ListItemSecondaryAction>*/}
                    </ListItem>
                    <SubItem open={open} id={item.id} subItems={item.chapterQuestions} />
                </div>
            )}
        </Draggable>
    );
}

const ListItems = React.memo(({ list }: { list: any }) => {
    return list.map((item: any, index: number) => {
        return <Item item={item} index={index} key={item.id} />;
    });
});

// @ts-ignore
export const DndList = () => {
    const list = useSelector(getListSelector);
    const [state, setState] = useState({ list: list });

    const dispatch = useDispatch();

    const onDragEndComplex = (result: any) => {
        // console.log("onDragEndComplex")
        // dropped outside the list
        if (!result.destination) {
            console.log("NO DESTINATION");
            return;
        }
        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;
        // console.log("sourceIndex", sourceIndex)
        // console.log("destIndex", destIndex)
        if (result.type === "droppableItem") {
            // console.log("droppableItem before reorder items", state.list);

            const items = reorder(state.list, sourceIndex, destIndex);

            // console.log("droppableItem reordered items", items)

            setState({
                // @ts-ignore
                list: items,
            });
            updateStore();
        } else if (result.type === "droppableSubItem") {
            const itemSubItemMap = state.list.reduce((acc: any, item: any) => {
                acc[item.id] = item.chapterQuestions;
                return acc;
            }, {});

            const sourceParentId = result.source.droppableId;
            const destParentId = result.destination.droppableId;

            const sourceSubItems = itemSubItemMap[sourceParentId];
            const destSubItems = itemSubItemMap[destParentId];

            let newItems = [...state.list];

            /** In this case subItems are reOrdered inside same Parent */
            if (sourceParentId === destParentId) {
                const reorderedSubItems = reorder(sourceSubItems, sourceIndex, destIndex);
                // @ts-ignore
                newItems = newItems.map((item) => {
                    if (item.id === sourceParentId) {
                        return {
                            ...item,
                            chapterQuestions: reorderedSubItems,
                        };
                    }
                    return item;
                });
                setState({
                    list: newItems,
                });
                updateStore();
            } else {
                let newSourceSubItems = [...sourceSubItems];
                const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

                let newDestSubItems = [...destSubItems];
                newDestSubItems.splice(destIndex, 0, draggedItem);
                newItems = newItems.map((item) => {
                    if (item.id === sourceParentId) {
                        return {
                            ...item,
                            chapterQuestions: newSourceSubItems,
                        };
                    } else if (item.id === destParentId) {
                        return {
                            ...item,
                            chapterQuestions: newDestSubItems,
                        };
                    }
                    return item;
                });
                setState({
                    list: newItems,
                });
                updateStore();
            }
        }
    };

    const updateStore = useCallback(() => {
        dispatch(updateQuizListItem(state.list));
    }, [dispatch, state]);

    // useEffect(() => {
    //     console.log("DNDList state updates", state.list);
    //     dispatch(updateQuizListItem(state.list));
    // }, [state, dispatch]);

    useEffect(() => {
        console.log("DNDList initialItems", list);
        setState({ list: list });
    }, [list]);

    // @ts-ignore
    return (
        <DragDropContext onDragEnd={onDragEndComplex}>
            <Droppable droppableId="list" type="droppableItem">
                {(provided, snapshot) => (
                    <List ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {/* @ts-ignore */}
                        <ListItems list={state.list} />
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};
