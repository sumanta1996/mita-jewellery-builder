import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Categories.css';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.props.setCategories();
    }

    categoryClickedHandler = categoryValue => {
        this.props.history.push({
            pathname: '/categoryWise',
            aboutProps: categoryValue
        });
    }

    render() {
        let data = <Spinner />
        if (this.props.categories) {
            data = this.props.categories.map(category =>
                <div key={category.value} className='column' onClick={() => this.categoryClickedHandler(category.value)}>
                    <div className={classes.card}>
                        <div className="card-body">
                            <h2 className="card-title">{category.displayValue}</h2>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className='row' style={{ overflowY: 'scroll'}}>
                {data}
            </div>
        )
    }
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

export default connect(mapPropsToState, dispatchPropsToState)(withErrorHandler(Categories, axios));