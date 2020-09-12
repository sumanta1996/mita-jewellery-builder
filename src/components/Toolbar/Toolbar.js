import React from 'react';
import classes from './Toolbar.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SearchButton from '../SearchButton/SearchButton';
import CartIconHome from '../Logo/CartIconHome/CartIconHome';

const toolbar = props => {
    let attachedClasses = [classes.Toolbar];
    props.path === '/' ? attachedClasses.push(classes.ToolbarTransparent) : attachedClasses.push(classes.ToolbarNotTransparent);
    return (
        <header className={attachedClasses.join(' ')}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <CartIconHome />
            <Logo />
            {props.path !== '/' && !props.path.includes('admin') ? window.innerWidth > 500 ? <SearchButton /> : null : null}
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}



export default toolbar;