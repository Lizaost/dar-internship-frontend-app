import React, {useEffect, useReducer, useState} from "react";
import {Button} from "../../components/button/Button";
import "./Chat.scss";
import {Message} from "../../components/message/Message";
import {Textarea} from "../../components/textarea/Textarea";
import {UserInfo} from "../../types/interfaces";
import {ChatActions, chatStateReducer, useWebSocket} from "../../services/chat";

type Props = {
    user?: UserInfo | null;
}

export const Chat: React.FunctionComponent<Props> = ({user}) => {

    const [message, setMessage] = useState<string>("");
    const [isSendingAllowed, setIsSendingAllowed] = useState<boolean>(false);

    const [state, dispatch] = useReducer(chatStateReducer, {messages: []});
    console.log(state);

    const socketClient = useWebSocket({userId: user?.firstname});

    const messageHandler = (value: string) => {
        console.log("Message: " + value);
        setMessage(value);
        if (value.length > 0) {
            setIsSendingAllowed(true);
        }
    };

    const emptyMessageHandler = () => {
        console.log("Sending empty messages is not allowed");
        setIsSendingAllowed(false);
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("sending message");
        console.log("Message: \n" + message);
        socketClient.sendMessage(message);
    };

    const onMessage = ({data}: {data: string}) => {
        console.log(data);
        dispatch({
            type: ChatActions.ADD_MESSAGE,
            payload: data
        })
    };

    useEffect(() => {
        socketClient.eventEmitter.on("message", onMessage);
        return () => {
            socketClient.eventEmitter.off("message", onMessage);
            socketClient.close();
        }
    }, []);

    return (<div className="Chat">
        <div className="chat-wrapper">
            <div className="messages-list-wrapper">
                <Message avatar="/images/star_wars_wallpaper_2.png"
                         message="Sith code"/>
                <Message avatar="/images/star_wars_wallpaper_1.png"
                         isMyMessage={true}
                         message="Peace is a lie, there is only passion."/>
                <Message avatar="/images/star_wars_wallpaper_1.png"
                         isMyMessage={true}
                         message="Through passion, I gain strength."/>
                <Message avatar="/images/star_wars_wallpaper_4.png"
                         message="Through strength, I gain power."/>
                <Message avatar="/images/star_wars_wallpaper_1.png"
                         isMyMessage={true}
                         message="Through power, I gain victory."/>
                <Message avatar="/images/star_wars_wallpaper_3.png"
                         message="Through victory, my chains are broken."/>
                <Message avatar="/images/star_wars_wallpaper_2.png"
                         message="The Force shall free me."/>
                <Message avatar="/images/star_wars_wallpaper_1.png"
                         isMyMessage={true}
                         message={'Nwûl tash.\nDzwol shâsotkun.Shâsotjontû châtsatul nu tyûk.' +
                         '\nTyûkjontû châtsatul nu midwan.\nMidwanjontû châtsatul nu asha.\n' +
                         'Ashajontû kotswinot itsu nuyak.\nWonoksh Qyâsik nun.'}/>
            </div>
            <div className="message-input-wrapper">
                <form onSubmit={submitHandler} className="message-input-form">
                    <Textarea name="message"
                              placeholder="Enter message"
                              required={true}
                              onChange={messageHandler}
                              onEmpty={emptyMessageHandler}/>
                    <Button className="send-message" disabled={!isSendingAllowed} text="Send"/>
                </form>
            </div>
        </div>
    </div>);
};
