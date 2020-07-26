import React from "react";
import {useParams} from "react-router";

export const Details = () => {
    let {id} = useParams();
    return <h1>Post Details {id}</h1>
};
