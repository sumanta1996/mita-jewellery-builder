import React, { useEffect, useState } from 'react';
import classes from './Toolbar.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SearchButton from '../SearchButton/SearchButton';
import CartIconHome from '../Logo/CartIconHome/CartIconHome';

const toolbar = props => {
    const [showSearch, setShowSearch] = useState(true);

    let attachedClasses = [classes.Toolbar];
    props.path === '/' ? attachedClasses.push(classes.ToolbarTransparent) : attachedClasses.push(classes.ToolbarNotTransparent);

    const notAllowedComponents = ['admin', 'cart', 'checkout', 'orders', 'logout', 'contactus'];
    useEffect(() => {
        notAllowedComponents.map(each => {
            if (props.path.includes(each)) {
                setShowSearch(false);
            }
            return null;
        });
    }, [props.path])

    return (
        <header className={attachedClasses.join(' ')}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <CartIconHome />
            <Logo />
            {props.path !== '/' && showSearch ? window.innerWidth > 500 ? <SearchButton /> : null : null}
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}



export default toolbar;