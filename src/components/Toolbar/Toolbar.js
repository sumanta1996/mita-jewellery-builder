import React from 'react';
import classes from './Toolbar.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
    let attachedClasses = [classes.Toolbar];
    props.path === '/' ? attachedClasses.push(classes.ToolbarTransparent) : attachedClasses.push(classes.ToolbarNotTransparent);
    return (
        <header className={attachedClasses.join(' ')}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}



export default toolbar;