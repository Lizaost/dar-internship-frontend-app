import {Post, Video} from "../types/interfaces";
import axios from "axios";
import {videoMock} from "./mock";

export const getPosts = () => {
    return axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.data);
};

export const getPostById = (id: number) => {
    return axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.data)
        .then(res =>
            //console.log(res.filter((item => item.id==id))[0]);
            res.filter((item => item.id==id))[0]);
};

export const getVideos = () => {
    return new Promise<Video[]>((resolve, reject) => {
        resolve(videoMock);
    })
};
