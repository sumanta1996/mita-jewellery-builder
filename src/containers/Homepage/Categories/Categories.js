import React, { useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Categories.css';
import axios from 'axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import NavigationItem from '../../../components/NavigationItems/NavigationItem/NavigationItem';

const categories = props => {
    useEffect(() => {
        props.setCategories();
    }, []);

    let data = null;

    if (props.categories) {
        data = props.categories.map(category =>
            <NavigationItem key={category.displayValue} link={'/' + category.displayValue} routeValue={category.displayValue}>{category.displayValue}</NavigationItem>
        )
    }
    return (
        <ul className={classes.Categories}>
            {data}
        </ul>
    )
}

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

export default connect(mapPropsToState, dispatchPropsToState)(withErrorHandler(categories, axios));