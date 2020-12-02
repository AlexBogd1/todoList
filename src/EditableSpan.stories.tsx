import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import EditableSpan, {EditableSpanPropsType} from "./EditableSpan";



export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: 'Change value editable span',
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value to editable span'
        }



    },
} as Meta;


const changeTitleCallback = action('Value changed')


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

const baseArg = {
    changeTitle: changeTitleCallback,
}


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    ...baseArg,
};



