import React, {useEffect, useState} from 'react';

import "./Videos.scss";
import {Video} from "../../types/interfaces";
import {getVideos} from "../../services/api";
import {Link} from "react-router-dom";

export const Videos: React.FunctionComponent = () => {

    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        getVideos().then((videos) => setVideos(videos));
    });

    return (<div className="Videos">
        {
            videos.map( video => (
                <div className="video-item">
                    <Link to={'/room/' + video.id}>{video.title}</Link>
                </div>
                )
            )
        }
    </div>)
};
