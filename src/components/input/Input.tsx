import React, {useEffect, useState} from 'react';
import "./Input.scss";

type Props = {
    name: string;
    placeholder: string;
    className?: string;
    required?: boolean;
    onChange?: (val: string) => void;
    areSpacesAllowed?: boolean;
}

export const Input: React.FunctionComponent<Props> = ({name, required, areSpacesAllowed, className, placeholder, onChange}) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [inputChanged, setInputChanged] = useState<boolean>(false);
    const [inputError, setInputError] = useState<{ isEmpty?: boolean, isInvalid?: boolean }>({});

    const checkField = () => {

        if (required && !inputValue) {
            setInputError({
                ...inputError,
                isEmpty: true,
                isInvalid: false
            });
            return;
        }

        if (!areSpacesAllowed && inputValue.match(/\s/g)) {
            setInputError({
                ...inputError,
                isEmpty: false,
                isInvalid: true
            });
            return;
        }

        setInputError({
            ...inputError,
            isEmpty: false,
            isInvalid: false
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

    return (<div className="Input">
        <div className="form-group">
            <input type="text"
                   name={name}
                   className={"form-control " + (className ? className : "")}
                   placeholder={placeholder}
                   onChange={(event) => changeHandler(event.target.value)}/>
        </div>
        <div className="form-error">
            {inputError.isEmpty ? "This field is required" : ""}
            {inputError.isInvalid ? "Entered value is invalid" : ""}
        </div>
    </div>)
};
