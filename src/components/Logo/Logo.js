import React from 'react';
import amj from '../../assets/AMJ.png';
import classes from './Logo.css';

const logo = () => {
        return <div className={classes.Logo}>
                <img src={amj} alt='' />
        </div>;
}

export default logo;