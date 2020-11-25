import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type TaskPropsType = {
    todoListId: string
    task: TaskType
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, title: string) => void
    removeTask:    (taskId: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, props.todoListId, title);
    }
    const removeTask = () => {
        props.removeTask(props.task.id, props.todoListId);
    }

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        let newIsDoneValue: boolean = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneValue, props.todoListId);
    }

    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''} >
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    onChange={changeStatus}*/}
            {/*    checked={t.isDone}/>*/}
            <Checkbox
                onChange={onChangeHandler}
                checked={props.task.isDone}
                color ={'primary'}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>

        </li>
    )
})
