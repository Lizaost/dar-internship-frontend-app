import React, {useState} from 'react';

import "./Room.scss";

import YouTube from "react-youtube";
import {Chat} from "../chat/Chat";
import {RoomHeader} from "../../components/room-header/RoomHeader";
import {UserContext} from "../../services/context";
import {useParams} from "react-router";

import {Button} from "../../components/button/Button";
import {IconButton} from "../../components/fa-icon-button/IconButton";
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'

enum PlayerStates {
    PLAYING = "PLAYING",
    PAUSED = "PAUSED"
}

export const Room: React.FunctionComponent = () => {

    const {id} = useParams();

    const [player, setPlayer] = useState<any>(null);
    const [playerState, setPlayerState] = useState<PlayerStates>(PlayerStates.PAUSED);
    console.log(player);

    const onVideoInit = (event: { target: any }) => {
        setPlayer(event.target);
    };

    const toggleVideo = () => {
        let state = player?.getPlayerState();
        let time = player?.getCurrentTime();
        console.log("Time");
        console.log(time);
        if (state !== 1) {
            player?.playVideo();
            setPlayerState(PlayerStates.PLAYING);
        }
        if (state === 1) {
            player?.pauseVideo();
            setPlayerState(PlayerStates.PAUSED);
        }
    };

    const seekVideo = (seconds: number) => {
        if (player) {
            let position = player.getCurrentTime();
            let duration = player.getDuration();
            let newPosition = Math.max(0, position + seconds);
            newPosition = Math.min(newPosition, duration);
            console.log(`seeking video by ${seconds} second(s), new position is ${newPosition}/${duration} seconds`);
            player.seekTo(newPosition);
        }
    };

    return (
        <div>
            <RoomHeader/>
            <div className="Room">
                <div className="video-wrapper">
                    <YouTube videoId={id} className="video" onReady={onVideoInit}/>
                    <div className="player-controls-wrapper">
                        <Button className="video-play"
                                text="-10s"
                                clickHandler={() => seekVideo(-10)}/>
                        <IconButton className="video-play"
                                    icon={!player || playerState === PlayerStates.PAUSED ? faPlay : faPause}
                                    clickHandler={toggleVideo}/>
                        <Button className="video-play"
                                text="+10s"
                                clickHandler={() => seekVideo(+10)}/>
                    </div>
                </div>
                <UserContext.Consumer>
                    {(value) => (
                        <Chat user={value?.user}/>
                    )
                    }
                </UserContext.Consumer>
            </div>
        </div>
    );
};
