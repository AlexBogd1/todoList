import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";



export default {
    title: 'TodoList/Task',
    component: Task,
    argTypes: {
        removeTask: {
            description: 'remove task from todolist',
        },
        changeTaskTitle: {
            description: 'change task title  from todolist',
        },
        changeStatus: {
            description: 'changeStatus task from todolist',
        },
        task: {
            description: 'task',
        },
        todoListId: {
            description: 'id of todolist',
        }

    },
} as Meta;


const removeTaskCallback = action('Remove button inside task children')
const changeTaskTitleCallback = action('Change title inside task')
const changeStatusCallback = action('status was changed inside Task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArg = {
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeStatus: changeStatusCallback,
}


export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArg,
    task: {id:"1", isDone: true, title: 'CSS'},
    todoListId: 'todoList1'

};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {id:"1", isDone: false, title: 'CSS'},
    todoListId: 'todoList2'

};


