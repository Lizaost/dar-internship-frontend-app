import React, {useEffect, useState} from 'react';
import "./Textarea.scss";

type Props = {
    name: string;
    placeholder: string;
    required?: boolean;
    onChange?: (val: string) => void;
    onEmpty?: () => void;
}

export const Textarea: React.FunctionComponent<Props> = ({name, required, placeholder, onChange, onEmpty}) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [inputChanged, setInputChanged] = useState<boolean>(false);
    const [inputError, setInputError] = useState<{ isEmpty?: boolean }>({});

    const checkField = () => {

        if (required && !inputValue) {
            setInputError({
                ...inputError,
                isEmpty: true
            });
            if (onEmpty) {
                onEmpty();
            }
            return;
        }

        setInputError({
            ...inputError,
            isEmpty: false
        });
    };

    useEffect(() => {
        setInputChanged(true);

        if (!inputChanged) {
            return;
        }

        checkField();
        console.log(inputError);
    }, [inputValue]);

    const changeHandler = (value: string) => {
        console.log(value);
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (<div className="Textarea">
        <div className="form-group">
            <textarea name={name}
                      className="form-control"
                      placeholder={placeholder}
                      onChange={(event) => changeHandler(event.target.value)}/>
        </div>
    </div>)
};
