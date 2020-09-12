import React from 'react';
import { connect } from 'react-redux';
import EachNotification from './EachNotification/EachNotification';
import classes from './Notification.css'

const notification = props => {
    let content = <div className={classes.Notification}>
        <h1>You are not authorized to access this feature.</h1></div>
    if (props.isAuth) {
        const orders = [...props.orders];
        content = <div className={classes.Notification}>
            {orders.reverse().map(order => <EachNotification key={order.id} order={order} />)}
        </div>
    }

    return content;
}

const mapPropsToState = state => {
    return {
        orders: state.adminConsole.orders,
        isAuth: state.auth.token !== null
    }
}

export default connect(mapPropsToState)(notification);