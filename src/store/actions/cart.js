import * as actionTypes from './actionTypes';
import axios from 'axios';

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
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(saveDataSuccess());
        }).catch(err => dispatch(saveDataFailure()));
    }
}