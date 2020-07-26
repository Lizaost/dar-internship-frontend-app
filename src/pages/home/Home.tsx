import React, {useState} from 'react';
import {Hello} from '../../components/hello/Hello';
import {Button} from '../../components/button/Button';
import {Avatar} from '../../components/avatar/Avatar';

import './Home.scss';

export const Home: React.FunctionComponent = () => {
    const avatars = ["/images/star_wars_wallpaper_1.png",
        "/images/star_wars_wallpaper_2.png",
        "/images/star_wars_wallpaper_3.png",
        "/images/star_wars_wallpaper_4.png"];

    const [image, setImage] = useState<string>(avatars[0]);
    const [currentAvatarVariant, setCurrentAvatarVariant] = useState<number>(1);
    const [name, setName] = useState<String>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const btnClickLoginHandler = () => {
        console.log("Login button clicked");
        setLoggedIn(true);
    };

    const btnClickLogoutHandler = () => {
        console.log("Logout button clicked");
        setLoggedIn(false);
    };

    const btnClickSetNameHandler = () => {
        console.log("Set name button clicked");
        setName("Liza");
    };

    const btnClickChangeAvatarHandler = () => {
        const numberOfAvatarVariants = avatars.length;
        // to make sure that next avatar doesn't match the current one
        // select avatar variant number from 0 to length-2 (since one is already used)
        // and increase it by 1 if it is equal to or larger than the current avatar variant
        let variant = Math.floor(Math.random() * Math.floor(numberOfAvatarVariants - 1));
        console.log("current " + currentAvatarVariant + "  next " + variant);
        if (variant >= currentAvatarVariant) {
            variant = variant + 1;
            console.log("new variant was changed to " + variant)
        }
        setCurrentAvatarVariant(variant);
        setImage(avatars[variant]);
    };

    return (
        <div className="Home">
            <div className="Home-wrapper">
                {loggedIn ? <div className="flex-wrapper user-info-wrapper">
                    <Avatar src={image}/>
                    <Hello name={name}/>
                </div> : null}
                <div className="flex-wrapper buttons-wrapper">
                {loggedIn ?
                    <Button className="logout-button" clickHandler={btnClickLogoutHandler} text="Log out"/> :
                    <Button className="login-button" clickHandler={btnClickLoginHandler} text="Log in"/>}
                {loggedIn ?
                    <Button className=""
                            clickHandler={btnClickSetNameHandler}
                            text="Set name to 'Liza"
                    />
                    : null}
                {loggedIn ?
                    <Button className=""
                            clickHandler={btnClickChangeAvatarHandler}
                            text="Set random avatar"/>
                    : null}
                </div>
            </div>
        </div>
    );
};
