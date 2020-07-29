import React from 'react';
import './Button.scss';

type Props = {
    className: string;
    text: string;
    type?: 'button' | 'submit' | 'reset';
    clickHandler?: () => void;
    disabled?: boolean;
};

export const Button: React.FunctionComponent<Props> = ({text, type, className, clickHandler, disabled}) => {
    console.log("disabled: " + disabled);
    return (
        <button className={"Button " + className}
                onClick={clickHandler}
                type={type ? type : "submit"}
                disabled={disabled}>
            {text}
        </button>
    );
};
