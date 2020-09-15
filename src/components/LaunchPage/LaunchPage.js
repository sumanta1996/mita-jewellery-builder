import React from 'react';
import logo1 from '../../assets/logo1.png';
import classes from './LaunchPage.css'

const launchPage = () => {
    return (
        <div>
            <div className={classes.LaunchPage}></div>
            <div className={classes.Image}><img src={logo1} alt='' /></div>
        </div>
    )
}

export default launchPage;