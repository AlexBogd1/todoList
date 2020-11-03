import {FilterValuesType, TodoListType} from "../App";
import { v1 } from "uuid";
import {strict} from "assert";



export type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListActionType | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}


export const todoListReducer = (state: Array<TodoListType>, action: ActionsType) => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all",
            }
            return [...state,newTodoList]
        case 'CHANGE-TODOLIST-TITLE':{
            const todoList = state.find(tl => tl.id === action.id);
            if(todoList){
                todoList.title = action.title;
                return [...state];
            }
            return state;
        }

        case 'CHANGE-TODOLIST-FILTER':
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
                return [...state];
            }
            return state;
        default:
            throw Error("I don't understand")
    }
}

export const removeTodoListAc =
    (todoListID: string): RemoveTodoListActionType => {
        return {type: "REMOVE-TODOLIST", id: todoListID}
    };

export const addTodoListAc =
    (todoListTitle: string): AddTodoListActionType=> {
        return {type: 'ADD-TODOLIST',title: todoListTitle}
    };
export const changeTodoListAc =
    (todoListId: string, todoListTitle:string ): ChangeTodoListActionType=> {
        return {type: 'CHANGE-TODOLIST-TITLE',title: todoListTitle, id: todoListId}
    };
export const changeTodoListFilterAc =
    (todoListId: string, todoListFilter:FilterValuesType ): ChangeTodoListFilterActionType=> {
        return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: todoListFilter}
    };