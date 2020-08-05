import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import {Button} from '../../components/button/Button';

import './Home.scss';
import {Input} from "../../components/input/Input";
import {useHistory} from "react-router";
import {UserInfo} from '../../types/interfaces';
import {UserContext} from "../../services/context";

type Props = {
    setUser: (user: UserInfo) => void;
}

export const Home: React.FunctionComponent<Props> = ({setUser}) => {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const userContext = useContext(UserContext);

    const history = useHistory();

    const onChangeHandler = (field: string, value: string) => {
        console.log(field, value);
        const newVal = {
            ...userInfo,
            [field]: value
        };

        setUserInfo(newVal as any);
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(userInfo);
        if (userInfo?.firstname) {
            userContext?.setUser(userInfo);
            history.push('/videos');
        }
    };

    return (
        <div className="Home">
            <div className="Home-wrapper">
                <form onSubmit={submitHandler}>
                    <Input name="firstname"
                           placeholder="Enter your first name"
                           onChange={(value) => onChangeHandler('firstname', value)}
                           required={true}/>
                    <Input name="lastname"
                           placeholder="Enter your last name"
                           onChange={(value) => onChangeHandler('lastname', value)}
                           areSpacesAllowed={true}/>
                    <div className="flex-wrapper buttons-wrapper">
                        <Button type="submit" className="login-button" text="Log in"/>
                    </div>
                </form>
            </div>
        </div>
    );
};
