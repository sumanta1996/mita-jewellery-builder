import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories
    }
}

export const setOrders = orders => {
    return {
        type: actionTypes.SET_ORDERS,
        orders: orders
    }
}

export const fetchCategories = () => {
    return dispatch => {
        axios.get('https://mita-jewellery.firebaseio.com/Categories.json')
            .then(response => {
                const categories = [];
                for (let key in response.data) {
                    categories.push({ value: key, displayValue: response.data[key] })
                }
                dispatch(setCategories(categories));
            }).catch(err => console.log(err));
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        if(!getState().adminConsole.showNotification) {
            axios.get('https://mita-jewellery.firebaseio.com/orders.json')
            .then(response => {
                const orders = [];
                console.log(response.data);
                for(let key in response.data) {
                    const order = {
                        id: key,
                        customerName: response.data[key].customerName,
                        email: response.data[key].email,
                        mobileNum: response.data[key].mobilNum,
                        address: response.data[key].address,
                        images: response.data[key].images,
                        totalPrice: response.data[key].totalPrice,
                        delivered: response.data[key].delivered
                    }
                    orders.push(order);
                }
                dispatch(setOrders(orders));
            }).catch(error => console.log(error));
        }
    }
}