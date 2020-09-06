import React from 'react';
import amj from '../../assets/AMJ.png';
import classes from './LaunchPage.css'

const launchPage = () => {
    return (
        <div>
            <div className={classes.LaunchPage}></div>
            <div className={classes.Image}><img src={amj} alt='' /></div>
        </div>
    )
}

export default launchPage;