import React from "react";
import './MessageBubble.scss';

export const MessageBubble = (props: { value: string, username: string, className?: string, isMyMessage?: boolean }) => {
    return <div className="MessageBubble">
        <div
            className={"message " + (props.className ? props.className : "")
            + " " + (props.isMyMessage ? "my-message" : "")}>
            <div className="message-author">{props.username}</div>
            {props.value}</div>
    </div>
};
