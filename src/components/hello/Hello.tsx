import React from "react";
import './Hello.css';

export const Hello = (props: { name: String }) => {
    return <h1>Hello{props.name !== '' ? ", " + props.name : ""}!</h1>
};
