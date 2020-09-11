import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './EachNotification.css';
import sold from '../../../../assets/sold.svg';

const eachNotification = props => {
    const [orderDelivered, setOrderDelivered] = useState(false);

    useEffect(() => {
        setOrderDelivered(props.order.delivered);
    }, []);

    const orderDeliverHandler = () => {
        setOrderDelivered(true);
        const data = {
            delivered: true
        }
        axios.patch('https://mita-jewellery.firebaseio.com/orders/'+props.order.id+'.json', data);
    }

    return (
        <div key={props.order.id} className={classes.Each}>
            {orderDelivered ? <img className={classes.Sold} src={sold} />: null}
            <div className={classes.Images}>
                {props.order.images.map(image =>
                    <div key={image.imageId} >
                        <img src={image.urlArr.url1} />
                        <h6><strong>&#x20B9; {image.price}</strong></h6>
                    </div>
                )}
            </div>
            <hr />
            <h3><strong>USER DETAILS</strong></h3>
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td><strong>Customer Name:</strong></td>
                        <td>{props.order.customerName}</td>
                    </tr>
                    <tr>
                        <td><strong>Email Id:</strong></td>
                        <td>{props.order.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Mobile Number:</strong></td>
                        <td>{props.order.mobileNum}</td>
                    </tr>
                    <tr>
                        <td><strong>Address to be delivered:</strong></td>
                        <td>{props.order.address}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Price:</strong></td>
                        <td>&#x20B9; {props.order.totalPrice}</td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
            <button disabled={orderDelivered} onClick={orderDeliverHandler}>Order Delivered ? </button>
        </div>
    )
};

export default eachNotification;