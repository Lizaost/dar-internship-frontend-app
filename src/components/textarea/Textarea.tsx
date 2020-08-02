import React, {useEffect, useState} from 'react';
import "./Textarea.scss";

type Props = {
    name: string;
    placeholder: string;
    required?: boolean;
    onChange?: (val: string) => void;
    onEmpty?: () => void;
    text?: string;
}

export const Textarea: React.FunctionComponent<Props> = ({name, text, required, placeholder, onChange, onEmpty}) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [inputChanged, setInputChanged] = useState<boolean>(false);
    const [inputError, setInputError] = useState<{ isEmpty?: boolean }>({});
    const textareaRef = HTMLTextAreaElement;

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

    useEffect(() => {
        if (text) {
            setInputValue(text);
        }
        console.log("Value changed to " + text + " (from prop text)");
    }, [text]);

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
                      onChange={(event) => changeHandler(event.target.value)}
                      value={inputValue}/>
        </div>
    </div>)
};
