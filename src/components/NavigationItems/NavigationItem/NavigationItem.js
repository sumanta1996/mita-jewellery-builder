import React from 'react';
import { NavLink} from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return <li className={classes.NavigationItem}>
        {props.isNewOrder ? <div className={classes.NotificationBall}></div>: null}
        <NavLink 
        to={{
            pathname: props.link,
            aboutProps: props.routeValue
        }} exact
        activeClassName={classes.active}>{props.children}</NavLink>
    </li>
};

export default navigationItem;