import React, {useEffect, useState} from 'react';
import {EventEmitter} from 'events';
import {ChatMessage, SocketClientConfig} from '../types/interfaces'
import {func} from "prop-types";

const config: SocketClientConfig = {
    url: 'ws://zaaz-live.dar-dev.zone',
    room: "DAR123",
    userId: "",
    reconnect: true,
};


class SocketClient{
    private static instance: SocketClient | undefined;

    socket: WebSocket | undefined;

    reconnectTimeout: any;

    eventEmitter = new EventEmitter();

    constructor (private config: SocketClientConfig){
        this.init();
    }

    static getInstance(config: SocketClientConfig){
        console.log("SocketClient getInstance config");
        console.log(config);
        if (!this.instance){
            this.instance = new SocketClient(config);
        }
        return this.instance;
    }

    init (){
        console.log("Initing socket with config");
        console.log(this.config);
        this.socket = new WebSocket(`${this.config.url}?room=${this.config.room}&userId=${this.config.userId}`);
        this.socket.addEventListener('close', () => this.onClose());
        this.socket.addEventListener('open', () => this.onOpen());
        this.socket.addEventListener('message', (e) => this.onMessage(e));
    }

    onClose() {
        console.log("WEBSOCKET CLOSED");
        if (this.config.reconnect){
            this.reconnectTimeout = setTimeout(() => {
                this.init();
            }, 5000);
        }
    };

    onOpen() {
        console.log("WEBSOCKET OPEN");
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout)
        }
    };

    close() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout)
        }
        this.config.reconnect = false;
        this.socket?.close();
    };

    open(){
        if (this.socket?.readyState === WebSocket.CLOSED){
            this.init();
        }
    }

    sendMessage(text: string){
        const event = 'message';
        this.socket?.send(JSON.stringify({event, data: text}));
    };

    onMessage(e: MessageEvent){
        console.log(e);
        const message = JSON.parse(e.data);
        this.eventEmitter.emit(message.type, {data: message.data});
    }
}

export function useWebSocket(externalConfig?: Partial<SocketClientConfig>){
    const conf = {
        ...config,
        ...externalConfig
    };
    console.log("useWebSocket conf");
    console.log(conf);
    const [socketClient, setSocketClient] = useState<SocketClient>(SocketClient.getInstance(conf));

    useEffect(() => {
        setSocketClient(SocketClient.getInstance(conf));
    }, [socketClient?.socket?.readyState]);

    return socketClient;
}

export enum ChatActions {
    ADD_MESSAGE = 'ADD_MESSAGE'
}

export interface ChatState {
    messages: ChatMessage[];
}

export const chatStateReducer = (state: ChatState, action: {type: ChatActions, payload: any}) => {
    switch (action.type) {
        case ChatActions.ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
        default: {
            return state;
        }
    }
};
