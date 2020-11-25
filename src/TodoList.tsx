import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
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

export const TodoList = React.memo((props: PropsType) => {
    // let todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(t => t.id !== props.id)[0])
    // let dispatch = useDispatch();

    console.log('inside Todolist')
    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => task.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.isDone === true);
    }

    let tasks = tasksForTodolist.map(t => {

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

    const removeTodoList = useCallback(() => props.removeTodolist(props.id),
        [props.removeTodolist,props.id]);
    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),
        [props.changeFilter,props.id]) ;
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id),
        [props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback( () => props.changeFilter('completed', props.id),
        [props.changeFilter,props.id]);
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    },[props.id, props.addTask])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title);
    },
        [props.changeTodoListTitle,props.id])


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
})