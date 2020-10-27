import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onAddItemKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if (e.key === "Enter") onAddItemClick();
    }

    const onAddItemClick = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    return (
        <div>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onAddItemKeyPress}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            <TextField
                variant = {'outlined'}
                size = {'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onAddItemKeyPress}
                error = {!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton onClick={onAddItemClick} color='primary' >
                <AddBox/>
            </IconButton>
            {/*<Button onClick={onAddItemClick} variant='contained' color='primary'>+</Button>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
}


export default AddItemForm;