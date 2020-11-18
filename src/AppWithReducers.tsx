import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAc,
    changeTodoListAc,
    changeTodoListFilterAc,
    removeTodoListAC,
    todoListReducer
} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAc, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducers() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, dispatchTodolists] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]);

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Fish", isDone: false}
        ]
    })

    function addTask(taskTitle: string, todoListId: string) {
        dispatchTasks(addTaskAC(taskTitle, todoListId))
    }

    function removeTask(taskId: string, todoListId: string) {
        dispatchTasks(removeTaskAc(taskId, todoListId));
    }


    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatchTasks(changeTitleAC(taskId, title, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodolists(changeTodoListFilterAc(todoListId, value))
    }

    function removeTodolist(todoListId: string) {
        dispatchTodolists(removeTodoListAC(todoListId))
        dispatchTasks(removeTodoListAC(todoListId));
    }

    function addTodoList(title: string) {
        let action = addTodoListAc(title);
        dispatchTodolists(action);
        dispatchTasks(action);
    }

    function changeTodoListTitle(todolistId: string, title: string) {
      dispatchTodolists(changeTodoListAc(todolistId,title))
    }

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

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasks[tl.id].filter(task => task.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasks[tl.id].filter(task => task.isDone === true);
                            }

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

export default AppWithReducers;

