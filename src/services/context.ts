import {UserInfo} from '../types/interfaces';
import React from 'react';

export interface UserContext {
    user: UserInfo|null;
    setUser: (user: UserInfo) => void;
}

export const UserContext = React.createContext<UserContext | null>(null);
