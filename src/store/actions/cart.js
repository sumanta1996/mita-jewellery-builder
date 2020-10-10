import * as actionTypes from './actionTypes';
import axios from 'axios';
import Notification from '../../models/notification';

export const addToCart = image => {
    return {
        type: actionTypes.ADD_TO_CART,
        image: image
    }
}

export const removeFromCart = imageId => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        imageId: imageId
    }
}

export const saveDataStart = () => {
    return {
        type: actionTypes.SAVE_DATA_START
    }
}

export const saveDataSuccess = () => {
    return {
        type: actionTypes.SAVE_DATA_SUCCESS
    }
}

export const saveDataFailure = () => {
    return {
        type: actionTypes.SAVE_DATA_FAILURE
    }
}

export const clearCartData = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
}

export const saveData = orderData => {
    return dispatch => {
        dispatch(saveDataStart());
        axios.post('https://mita-jewellery.firebaseio.com/orders.json', orderData)
            .then(res => {
                const user = {
                    name: orderData.customerName,
                    email: orderData.email,
                    mobileNumber: orderData.mobilNum,
                    address: orderData.address
                }
                //console.log(res.data);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(saveDataSuccess());
                sendNotification(orderData.customerName, res.data.name);
            }).catch(err => dispatch(saveDataFailure()));
    }
}

const sendNotification = (name, orderId) => {
    axios.get('https://mita-jewellery.firebaseio.com/admin.json').then(res => {
        if (res.data) {
            let pushToken;
            for (let key in res.data) {
                pushToken = res.data[key].pushToken;
            }
            if (pushToken) {
                const title = 'Order was placed!';
                const body = 'Order is placed by ' + name + '. Open the app to see more...';
                fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'accept': 'application/json',
                        'accept-encoding': 'gzip, deflate',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: pushToken,
                        title: title,
                        body: body,
                    })
                }).then(res => {
                    //On succesfull push notification save the data to firebase console
                    const notification = new Notification(body, title, orderId, new Date().toISOString(), false, true);
                    axios.post('https://mita-jewellery.firebaseio.com/notifications.json', notification);
                })
            }
        }
    })
}