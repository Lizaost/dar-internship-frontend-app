import React from "react";
import './Avatar.scss';

export const Avatar = (props: {src:string}) => {
    return <img className="avatar" src={props.src}/>
};
