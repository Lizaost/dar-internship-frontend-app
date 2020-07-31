export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface SocketClientConfig {
    url: string;
    room: string;
    userId: string;
    reconnect?: boolean;
}

export interface ChatMessage {
    userId: string;
    room: string;
    text: string;
    time: string;
}

export interface UserInfo {
    firstname: string;
    lastname?: string;
}
