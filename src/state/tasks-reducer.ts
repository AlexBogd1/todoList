import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {addTodoListAc} from "./todoList-reducer";


export type ActionsType =
    | ReturnType<typeof removeTaskAc>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTitleAC>
    | ReturnType<typeof addTodoListAc>


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
            }

        // let stateCopy = {...state};
        // stateCopy[action.todolistId]=state[action.todolistId] = state[action.todolistId].
        //     filter(t => t.id !== action.taskID)
        // return stateCopy

        case "ADD-TASK":
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask: TaskType = {title: action.taskTitle, id: action.taskID, isDone: false};
            const tasksCopy = [newTask, ...tasks];
            stateCopy[action.todolistId] = tasksCopy;

            return stateCopy

        case "CHANGE-TASK-STATUS":
                return {
                    ...state,
                    [action.todolistID]: state[action.todolistID]
                        .map(t => t.id === action.taskId ? {...t, isDone: action.isDone}: t )
                }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskId ? {...t, title: action.title}: t )
            }

        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistID]: []
            }
        default:
            throw Error("I don't understand")
    }
}

export const removeTaskAc =
    (taskID: string, todolistId: string) => {
        return {type: "REMOVE-TASK", taskID, todolistId} as const
    };

export const addTaskAC = (taskTitle: string, todolistId: string) => {
    return {type: "ADD-TASK", taskTitle, todolistId, taskID: v1()} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistID} as const;
}

export const changeTitleAC = (taskId: string, title: string, todolistID: string) => {
    return {type: "CHANGE-TITLE", taskId, title, todolistID} as const;
}


