import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Order from './Order/Order';
import emptyCart from '../../assets/emptyCart.svg';
import classes from './Orders.css';
import Buttons from '../../components/Cart/Buttons/Buttons';

const orders = props => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        var totalPrice = 0;
        props.images.map(image => {
            totalPrice = totalPrice + (+image.price);
        });
        setTotalPrice(totalPrice);

    }, [props.images]);

    const buyNowHandler = () => {
        props.history.push({
            pathname: '/checkout',
            aboutProps: {
                totalPrice: totalPrice,
                size: props.images.length,
                data: props.images
            }
        })
    }



    let content = <div className={classes.EmptyCart}>
        <img src={emptyCart} alt='' />
        <p>Your cart is empty!</p>
        <p>Add Items to it now.</p>
        <button onClick={() => props.history.push('/')}>Shop Now</button>
        </div>

    if (props.images.length > 0) {
        content = <div className={classes.Orders}>
            {props.images.map(image => <Order key={image.imageId} image={image} />)}
            <div className={classes.Summary}>
                <h5><strong>Price Details</strong></h5>
                <hr />
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Price({props.images.length} items)</td>
                            <td>&#x20B9; {totalPrice}</td>
                        </tr>
                        <tr>
                            <td>Delivery Charges</td>
                            <td>Will depend on the location</td>
                        </tr>
                        <tr>
                            <td><hr /></td>
                            <td><hr /></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total Amount</strong></td>
                            <td><strong>&#x20B9; {totalPrice}</strong></td>
                        </tr>
                    </tfoot>
                </table>
                <Buttons cart clicked={buyNowHandler}>Buy Now</Buttons>
            </div>
        </div>
    }

    return content;
}

const mapPropsToState = state => {
    return {
        images: state.cart.images,
    }
}

export default connect(mapPropsToState)(orders);