import React from 'react';
import classes from './Toolbar.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <Logo />
            <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}



export default toolbar;