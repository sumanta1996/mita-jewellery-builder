import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import EachNotification from './EachNotification/EachNotification';
import classes from './Notification.css'

const notification = props => {
    useEffect(() => {
        props.fetchOrders();
    }, []);
    
    let content = <div>
        <h1>You are not authorized to access this feature.</h1></div>
    if (props.isAuth) {
        content = <div className={classes.Notification}>
            {props.orders.map(order => {
                return <EachNotification order={order} />
            })}
        </div>
    }

    //console.log(props.orders)
    return content;
}

const mapPropsToState = state => {
    return {
        orders: state.adminConsole.orders,
        isAuth: state.auth.token !== null
    }
}

const dispatchPropsToState = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapPropsToState, dispatchPropsToState)(notification);