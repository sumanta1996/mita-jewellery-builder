import React from 'react';
import classes from './DrawerToggleSideContent.css'

const drawerToggleSideContent = props => {
    return (
        <div className={classes.DrawerToggleSideContent}  onClick={props.clicked}></div>
    );
}

export default drawerToggleSideContent;