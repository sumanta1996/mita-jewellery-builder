import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxillary from '../../hoc/Auxillary';
import Categories from '../../containers/Homepage/Categories/Categories';

const sideDrawer = (props) => {
    const drawerHandle = props.middle ? classes.MiddleDrawer : classes.SideDrawer;
    const closeHandle = props.middle ? classes.Close : classes.CloseSideDrawer;
    let attachedClass = [drawerHandle, closeHandle];
    let attachedClassTip = [classes.Tip, classes.Close];
    if (props.open) {
        attachedClass = [drawerHandle, classes.Open];
        attachedClassTip = [classes.Tip, classes.Open];
    }
    return (
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed} />
            {props.middle ? <div className={attachedClassTip.join(' ')}></div> : null}
            <div className={attachedClass.join(' ')} onClick={props.closed}>
                {props.middle ? null :
                    <div className={classes.Logo}>
                        <Logo />
                    </div>}
                <nav>
                    {props.middle ? <Categories /> : <NavigationItems isAuth={props.isAuth} />}
                </nav>
            </div>
        </Auxillary>

    );
};

export default sideDrawer;