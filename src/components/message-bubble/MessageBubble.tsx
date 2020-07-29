import React from "react";
import './MessageBubble.scss';

export const MessageBubble = (props: { value: string, className?: string, isMyMessage?: boolean }) => {
    return <div className="MessageBubble">
        <div
            className={"message " + (props.className ? props.className : "")
            + " " + (props.isMyMessage ? "my-message" : "")}> {props.value}</div>
    </div>
};
