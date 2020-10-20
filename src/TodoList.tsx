import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";

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

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    onChange={changeStatus}
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
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

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value);
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError('');
    //     if (e.key === "Enter") onAddTaskClick();
    // }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask} />
            {/*<div>*/}
            {/*    <input*/}
            {/*        value={title}*/}
            {/*        onChange={onChangeHandler}*/}
            {/*        onKeyPress={onKeyPressHandler}*/}
            {/*        className={error ? 'error' : ''}*/}
            {/*    />*/}
            {/*    <button onClick={onAddTaskClick}>+</button>*/}
            {/*    {error && <div className={'error-message'}>{error}</div>}*/}
            {/*</div>*/}
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