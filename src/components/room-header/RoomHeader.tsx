import React, {useContext} from "react";
import './RoomHeader.scss';
import {UserContext} from "../../services/context";

export const RoomHeader = () => {
    const userContext = useContext(UserContext);

    return (userContext?.user? <h2 className="RoomHeader">Welcome, {userContext?.user.firstname}</h2> : null)
};
