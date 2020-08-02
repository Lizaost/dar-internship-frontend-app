import React, {useEffect, useReducer, useState} from "react";
import {Button} from "../../components/button/Button";
import "./Chat.scss";
import {Textarea} from "../../components/textarea/Textarea";
import {UserInfo} from "../../types/interfaces";
import {ChatActions, chatStateReducer, useWebSocket} from "../../services/chat";
import {ChatMessages} from "../../components/chat-messages/ChatMessages";
import Picker from 'emoji-picker-react';

type Props = {
    user?: UserInfo | null;
}

export const Chat: React.FunctionComponent<Props> = ({user}) => {

    const [message, setMessage] = useState<string>("");
    const [isSendingAllowed, setIsSendingAllowed] = useState<boolean>(false);
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

    const [chosenEmoji, setChosenEmoji] = useState({emoji: null, isSelected: false});

    const [state, dispatch] = useReducer(chatStateReducer, {messages: []});
    console.log(state);
    console.log(chosenEmoji);
    console.log("Message = " + message);

    const socketClient = useWebSocket({userId: user?.firstname});

    const onEmojiClick = (event: any, emojiObject: any) => {
        console.log("Emoji is picked");
        setChosenEmoji(emojiObject);
    };

    // Since state (chosenEmoji) is updates asynchronously, add chosenEmoji
    // to current message each time it is changed using useEffect hook
    useEffect(() => {
        let emoji = chosenEmoji?.emoji ? chosenEmoji?.emoji : "";
        console.log(emoji);
        let newMessage = message + emoji;
        console.log("newMessage = " + newMessage);
        setMessage(newMessage);
    }, [chosenEmoji]);

    const toggleEmojiPicker = () => {
        let newPickerState = !isPickerOpen;
        setIsPickerOpen(newPickerState);
    };

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
        setMessage(" ");
    };

    const onMessage = ({data}: { data: string }) => {
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
            <ChatMessages
                messages={state.messages}
                user={user}/>

            <div className={"emoji-picker-wrapper " + (isPickerOpen ? "open-picker" : "closed-picker")}>
                <Picker onEmojiClick={onEmojiClick}/>
            </div>

            <div className="message-input-wrapper">
                <form onSubmit={submitHandler} className="message-input-form">
                    <Button
                        className={"open-emoji-picker "}
                        text={":)"}
                        clickHandler={toggleEmojiPicker}
                        type={"button"}/>

                    <Textarea name="message"
                              placeholder="Enter message"
                              required={true}
                              onChange={messageHandler}
                              onEmpty={emptyMessageHandler}
                              text={message}/>
                    <Button className="send-message" disabled={!isSendingAllowed} text="Send"/>
                </form>
            </div>
        </div>
    </div>);
};
