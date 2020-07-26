import React from "react";
import './Loading.scss';

export const LoadingIndicator = (props: {loadingItem: string}) => {
    return <div className="loading-indicator">Loading {props.loadingItem}...</div>
};
