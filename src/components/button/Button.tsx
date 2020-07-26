import React from 'react';
import './Button.scss';

type Props = {
    className: string;
    text: string;
    clickHandler: () => void;
};

export const Button: React.FunctionComponent<Props> = ({text, className, clickHandler}) => {
    console.log(className);
    return (
        <button className={"Button " + className}
                onClick={clickHandler}>
            {text}
        </button>
    );
};
