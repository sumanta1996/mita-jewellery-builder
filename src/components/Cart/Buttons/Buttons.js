import React from 'react';
import classes from './Buttons.css';
import cart from '../../../assets/cart.svg';
import buynow from '../../../assets/buynow.svg';
import checkmark from '../../../assets/checkmark.svg';

const buttons = props => {
    let attachedClasses = [classes.Buttons];
    props.cart ? attachedClasses.push(classes.Cart) : attachedClasses.push(classes.BuyNow);
    
    return (
        <button className={attachedClasses.join(' ')} onClick={props.clicked} disabled={props.added && props.cart}>
            <img src={props.cart && props.added ? checkmark : props.cart ? cart : buynow} alt='' />
            {props.children}
        </button>
    )
}

export default buttons;