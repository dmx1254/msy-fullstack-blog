import React from 'react';
import { CircularProgress } from '@material-ui/core';
import "./logout.css";

const LogoutLoading = () => {
    return (
        <div className='logout'>
            <CircularProgress />
        </div>
    );
};

export default LogoutLoading;