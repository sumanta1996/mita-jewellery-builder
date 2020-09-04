import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxillary from '../../hoc/Auxillary';

const sideDrawer = (props) => {
    let attachedClass = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClass = [classes.SideDrawer, classes.Open];
    }
    return(
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClass.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Auxillary>

    );
};

export default sideDrawer;