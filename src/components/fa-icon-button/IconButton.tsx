import React from 'react';
import './IconButton.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    className: string;
    icon: any;
    type?: 'button' | 'submit' | 'reset';
    clickHandler?: () => void;
    disabled?: boolean;
};

export const IconButton: React.FunctionComponent<Props> = ({icon, type, className, clickHandler, disabled}) => {
    console.log("disabled: " + disabled);
    return (
        <button className={"Button " + className}
                onClick={clickHandler}
                type={type ? type : "submit"}
                disabled={disabled}>
            <FontAwesomeIcon icon={icon}/>
        </button>
    );
};
