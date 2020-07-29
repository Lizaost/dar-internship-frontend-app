import React from "react";
import './Message.scss';
import {Avatar} from "../avatar/Avatar";
import {MessageBubble} from "../message-bubble/MessageBubble";

export const Message = (props: { message: string, avatar: string, isMyMessage?: boolean }) => {
    return <div className={"Message " + (props.isMyMessage? "my-message-wrapper" : "")}>
        <Avatar src={props.avatar}/>
        <MessageBubble className="message-bubble" value={props.message} isMyMessage={props.isMyMessage}/>
    </div>
};
