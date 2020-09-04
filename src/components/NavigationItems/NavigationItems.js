import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/admin">Admin Console</NavigationItem>
        {props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : null}
        <NavigationItem link="/contactus">Contact Us</NavigationItem>
    </ul>
);

export default navigationItems;