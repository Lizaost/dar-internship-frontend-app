import React, {useEffect, useReducer, useState} from "react";
import "./ChatMessages.scss";
import {Message} from "../../components/message/Message";
import {ChatMessage, UserInfo} from "../../types/interfaces";

type Props = {
    user?: UserInfo | null;
    messages: ChatMessage[] | null;
}

export const ChatMessages: React.FunctionComponent<Props> = ({user, messages}) => {
    console.log("ChatMessages user = " + user);

    return <div className="ChatMessages">
        <div className="messages-list-wrapper">
            {messages ?
                messages.map((message: ChatMessage) => (
                    <Message message={message.text}
                             username={message.userId}
                             isMyMessage={user ? user.firstname===message.userId : undefined}/>
                ))
                : null}
        </div>
    </div>
};
