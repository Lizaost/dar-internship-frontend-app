import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Post} from "../../types/interfaces";
import {getPostById} from "../../services/api";
import "./Details.scss";
import {LoadingIndicator} from "../../components/loading-indicator/Loading";

export const Details = () => {
    let {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);
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
            (post != undefined ?
                <div className="post-wrapper">
                    <h1 className="post-title">{post.title}</h1>
                    <span className="post-author">Author: User{post.userId}</span>
                    <p className="post-text">{post.body}</p>
                </div>
                : <div className="post-not-found">
                    <h1 className="post-not-found-title">Post not found</h1>
                    <p className="post-not-found-message">The post with id {id} was not found or could not be loaded.
                        It was probably deleted or never existed. Check if the page address is correct.</p>
                </div>)
            : <div className="loading-indicator-wrapper">
                <LoadingIndicator loadingItem="post"/>
            </div>}
    </div>);
};
