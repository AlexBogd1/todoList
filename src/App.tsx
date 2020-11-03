import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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

function App() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]);

    const [tasks, setTasks] = useState({
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
        const newTask: TaskType = {id: v1(), title: taskTitle, isDone: false};
        const todoList = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoList];
        setTasks({...tasks});

    }

    function removeTask(taskId: string, todoListId: string) {
        const todoList = tasks[todoListId];
        tasks[todoListId] = todoList.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }


    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const todoList = tasks[todoListId];
        let newTodoList = todoList.map(task => {
            if (task.id == taskId) {
                return {...task, isDone: isDone}
            }
            return task;
        })
        tasks[todoListId] = newTodoList;
        setTasks({...tasks})

        //     let task = tasks.find(task=> task.id === taskId );
        //     if(task) {
        //         task.isDone = isDone;
        //         setTasks({...tasks});
        //     }
    }

    function changeTaskTitle(taskId: string, todoListId: string, title: string) {
        const todoList = tasks[todoListId];
        let newTodoList = todoList.map(task => {
            if (task.id == taskId) {
                return {...task, title: title}
            }
            return task;
        })
        tasks[todoListId] = newTodoList;
        setTasks({...tasks})

        //     let task = tasks.find(task=> task.id === taskId );
        //     if(task) {
        //         task.isDone = isDone;
        //         setTasks({...tasks});
        //     }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }

    }

    function removeTodolist(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
        delete tasks[todoListId];
        setTasks({...tasks});
    }

    function addTodoList(title: string) {
        const newTodoListId = v1();
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all",
        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newTodoListId]: []});
    }

    function changeTodoListTitle(todolistId: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todolistId);
        if (todoList) {
            todoList.title = title;
            setTodoLists([...todoLists]);
        }
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

export default App;

