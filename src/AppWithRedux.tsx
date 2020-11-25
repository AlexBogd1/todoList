import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListAc, changeTodoListAc, changeTodoListFilterAc, removeTodoListAC} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAc} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function AppWithRedux() {
    
    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    let dispatch = useDispatch()

    const addTask = useCallback((taskTitle: string, todoListId: string) => {
        dispatch(addTaskAC(taskTitle, todoListId))
    },[dispatch]);

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAc(taskId, todoListId));
    }, [dispatch]);


    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(changeTitleAC(taskId, title, todoListId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAc(todoListId, value))
    },[dispatch] )

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAc(title);
        dispatch(action);
    }, [dispatch]);

    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodoListAc(todolistId,title))
    },[dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {

                            let tasksForTodoList = tasks[tl.id];



                            return (
                                <Grid item>
                                    <Paper elevation={6} style={{padding: '15px'}}>
                                        <TodoList
                                            id={tl.id}
                                            key={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            filter={tl.filter}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            removeTodolist={removeTodolist}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>

                                </Grid>

                            )
                        })
                    }</Grid>


            </Container>


        </div>
    );
}

export default AppWithRedux;

