import React from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Order.css';

const order = props => {

    return (
        <div className={classes.Order}>
            <img src={props.image.urlArr[Object.keys(props.image.urlArr)[0]]} alt='' />
            <div className={classes.Details}>
                <h3><strong>{props.image.title}</strong></h3>
                <p>Description: {props.image.description}</p>
                <p>Price: <strong>&#x20B9; {props.image.price}</strong></p>
                <button onClick={() => props.removeHandler(props.image.imageId)}>Remove</button>
            </div>
        </div>
    )
}

const dispatchPropsToState = dispatch => {
    return {
        removeHandler: imageId => dispatch(actions.removeFromCart(imageId))
    }
}

export default connect(null, dispatchPropsToState)(order);