import React from 'react';
import { withRouter } from 'react-router-dom';
import cart from '../../../assets/cart.svg';
import classes from './CartIconHome.css'

const cartIconHome = props => {
    return (
        <div className={classes.CartIconHome} onClick={() => props.history.push('/cart')}>
            <img src={cart} alt='' />
        </div>
    )
}

export default withRouter(cartIconHome);