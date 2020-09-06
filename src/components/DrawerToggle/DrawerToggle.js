import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = props => {
    let cssClasses = [classes.DrawerToggle];
    if(props.middle) {
        cssClasses.push(classes.MiddleToggle);
    }else {
        cssClasses.push(classes.Spacing);
    }
    return (
        <div className={cssClasses.join(' ')} 
        onClick={props.clicked}>
            <div></div>
            <div><p></p></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;