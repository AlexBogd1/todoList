import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (taskTitle: string, tasksId: string) => void
    removeTask: (taskId: string, todoListId: string) => void; // or Function
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
}

export function TodoList(props: PropsType) {


    // const [title, setTitle] = useState<string>('');
    // let [error, setError] = useState<string | null>(null);

    let tasks = props.tasks.map(t => {

        const removeTask = () => {
            props.removeTask(t.id, props.id);
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, props.id, title);
        }


        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''} >
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    onChange={changeStatus}*/}
                {/*    checked={t.isDone}/>*/}
                <Checkbox
                    onChange={changeStatus}
                    checked={t.isDone}
                    color ={'primary'}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>

            </li>
        )
    })

    // const onAddTaskClick = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(title.trim(), props.id);
    //         setTitle('');
    //     } else {
    //         setError('Title is required');
    //     }
    // }
    const removeTodoList = () => props.removeTodolist(props.id);
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title);
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style ={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    // className={props.filter === 'all' ? 'active' : ''}
                    variant ={props.filter === 'all' ? 'contained' : 'outlined'}
                    size = 'small'
                    color = {'primary'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    // className={props.filter === 'active' ? 'active' : ''}
                    variant ={props.filter === 'active' ? 'contained' : 'outlined'}
                    size = 'small'
                    color = {'primary'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    // className={props.filter === 'completed' ? 'active' : ''}
                    variant ={props.filter === 'completed' ? 'contained' : 'outlined'}
                    size = 'small'
                    color = {'primary'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}