import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    onChange={changeStatus}
                    checked={t.isDone}/>
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

            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}