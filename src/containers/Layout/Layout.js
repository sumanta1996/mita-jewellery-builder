import React, { useEffect, useState } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import MiddleDrawer from '../../components/MiddleDrawer/MiddleDrawer';
import LaunchPage from '../../components/LaunchPage/LaunchPage';

const layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(true);
    }

    const content = <Auxillary>
        {showLoader ? <LaunchPage /> : null}
        <Toolbar path={props.history.location.pathname} isAuth={props.isAuth} drawerToggleClicked={sideDrawerOpenHandler} />
        <SideDrawer isAuth={props.isAuthenticated} closed={sideDrawerClosedHandler} open={showSideDrawer} />
        <MiddleDrawer path={props.history.location.pathname} />
        {props.children}
        {props.history.location.pathname === '/' ? <div className={classes.container}></div> : null}
    </Auxillary>;

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
        }, 1000);
    }, [])

    return content;
}

const mapPropsToState = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default withRouter(connect(mapPropsToState)(layout));