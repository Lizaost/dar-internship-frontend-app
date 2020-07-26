import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Post} from "../../types/interfaces";
import {getPostById} from "../../services/api";
import "./Details.scss";
import {LoadingIndicator} from "../../components/loading-indicator/Loading";

export const Details = () => {
    let {id} = useParams();
    const [post, setPost] = useState<Post>({id: -1, body: "", title: "", userId: -1});
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getPostById(id)
            .then(data => {
                setPost(data);
                setLoaded(true);
                console.log(data)
            })
            .catch(err => console.error(err))
    }, []);

    return (<div className="Details">
        {loaded ?
            <div className="post-wrapper">
                <h1 className="post-title">{post.title}</h1>
                <span className="post-author">Author: User{post.userId}</span>
                <p className="post-text">{post.body}</p>
            </div>
            : <div className="loading-indicator-wrapper">
                <LoadingIndicator loadingItem="post"/>
            </div>}
    </div>);
};
