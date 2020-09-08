import React, { useState } from 'react';
import amj from '../../assets/AMJ.png';
import classes from './Logo.css';
import { Redirect } from 'react-router';

const logo = () => {
        const [redirect, setRedirect] = useState(false);
        const redirectHandler = () => setRedirect(true);

        return <div className={classes.Logo} onClick={redirectHandler}>
                <img src={amj} alt='' />
                {redirect ? <Redirect to='/' exact /> : null}
        </div>;
}

export default logo;