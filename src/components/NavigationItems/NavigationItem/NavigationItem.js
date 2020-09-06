import React from 'react';
import { NavLink} from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
        to={{
            pathname: props.link,
            aboutProps: props.routeValue
        }} exact
        activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;