import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";


export type ActionsType =
    | ReturnType<typeof removeTaskAc>
    | ReturnType<typeof addTaskAC>;


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
            const newTask: TaskType = {title: action.taskTitle, id:v1(),isDone: false};
            const tasksCopy = [newTask, ...tasks];
            stateCopy[action.todolistId] = tasksCopy;

            return stateCopy
        default:
            throw Error("I don't understand")
    }
}

export const removeTaskAc =
    (taskID: string, todolistId: string) => {
        return {type: "REMOVE-TASK", taskID, todolistId} as const
    };

export const addTaskAC = (taskTitle: string, todolistId: string) => {
    return {type: "ADD-TASK", taskTitle, todolistId} as const
}


// export const addTodoListAc =
//     (todoListTitle: string): AddTodoListActionType=> {
//         return {type: 'ADD-TODOLIST',title: todoListTitle}
//     };
// export const changeTodoListAc =
//     (todoListId: string, todoListTitle:string ): ChangeTodoListActionType=> {
//         return {type: 'CHANGE-TODOLIST-TITLE',title: todoListTitle, id: todoListId}
//     };
// export const changeTodoListFilterAc =
//     (todoListId: string, todoListFilter:FilterValuesType ): ChangeTodoListFilterActionType=> {
//         return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: todoListFilter}
//     };