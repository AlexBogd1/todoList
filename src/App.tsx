import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoList = {
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

    const [todoLists, setTodoLists] = useState<Array<TodoList>>([
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
    function changeTaskTitle(taskId: string,todoListId: string, title: string) {
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
        const newTodoList: TodoList = {
            id: newTodoListId,
            title: title,
            filter: "all",
        }
        setTodoLists([newTodoList,...todoLists]);
        setTasks({...tasks,[newTodoListId]: []});
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
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
                            changeTaskTitle = {changeTaskTitle}

                        />
                    )
                })
            }


        </div>
    );
}

export default App;

