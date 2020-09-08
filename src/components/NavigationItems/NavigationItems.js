import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Categories from '../../containers/Homepage/Categories/Categories';

const navigationItems = (props) => {

    return (
        <div className={classes.Tabsposition}>
            <div className={classes.DesktopOnly}>
                <Categories />
            </div>
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/">Home</NavigationItem>
                <NavigationItem link="/admin">Admin Console</NavigationItem>
                {props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : null}
                <NavigationItem link="/contactus">Contact Us</NavigationItem>
            </ul>
        </div>
    )
};

const mapPropsToState = state => {
    return {
        categories: state.adminConsole.categories
    }
}

const dispatchPropsToState = dispatch => {
    return {
        setCategories: () => dispatch(actions.fetchCategories())
    }
}

export default connect(mapPropsToState, dispatchPropsToState)(navigationItems);