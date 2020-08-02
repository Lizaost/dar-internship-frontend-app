import React from "react";
import './Message.scss';
import {Avatar} from "../avatar/Avatar";
import {MessageBubble} from "../message-bubble/MessageBubble";

export const Message = (props: { message: string, username: string, avatar?: string, isMyMessage?: boolean }) => {
    return <div className={"Message " + (props.isMyMessage ? "my-message-wrapper" : "")}>
        {props.avatar ? <Avatar src={props.avatar}/> : null}
        <MessageBubble className="message-bubble" value={props.message} username={props.username} isMyMessage={props.isMyMessage}/>
    </div>
};
