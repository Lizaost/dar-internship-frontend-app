import React from 'react';

import "./Room.scss";
import YouTube from "react-youtube";
import {Chat} from "../chat/Chat";

export const Room: React.FunctionComponent = () => {

    //todo Replace with real client data

    return (
        <div className="Room">
            <YouTube videoId={"gCyP9DjFS_w"} className="video"/>
            <Chat user={{firstname: "Liza", lastname: ""}}/>
        </div>
    );
};
