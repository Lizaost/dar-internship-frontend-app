import React, {useEffect, useReducer, useRef, useState} from 'react';
import {Button} from '../../components/button/Button';

import './Home.scss';
import {Input} from "../../components/input/Input";
import {useHistory} from "react-router";


export const Home: React.FunctionComponent = () => {

    const [userInfo, setUserInfo] = useState<{ firstname: string; lastname: string } | null>(null);

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
            history.push('/room');
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
