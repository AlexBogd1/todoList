import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onAddItemKeyPress}
                className={error ? 'error' : ''}
            />
            <button onClick={onAddItemClick}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
}


export default AddItemForm;