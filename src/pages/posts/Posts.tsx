import React, {useEffect, useState} from "react";
import {getPosts} from "../../services/api";
import {Post} from "../../types/interfaces";
import {Link} from "react-router-dom";
import "./Posts.scss";
import {LoadingIndicator} from "../../components/loading-indicator/Loading";

export const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getPosts()
            .then(data => {
                setPosts(data);
                setLoaded(true)
            })
            .catch(err => console.error(err))
    }, []);

    return <div className="Posts">
        <h1>Posts</h1>
        {loaded ?
            <div className="posts-list">
                {
                    posts.map(post => (
                        <Link to={"/posts/" + post.id} className="post-item">
                            <article>
                                <h3>{post.title}</h3>
                                <div className="post-item-text">{post.body}</div>
                            </article>
                        </Link>
                    ))
                }
            </div>
            : <div className="loading-indicator-wrapper">
                <LoadingIndicator loadingItem="posts"/>
            </div>
        }
    </div>
};
