import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories
    }
}

export const setOrders = (orders, isNewOrder) => {
    return {
        type: actionTypes.SET_ORDERS,
        orders: orders,
        isNewOrder: isNewOrder
    }
}

export const setOrdersStart = () => {
    return {
        type: actionTypes.SET_ORDERS_START
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
            dispatch(setOrdersStart());
            axios.get('https://mita-jewellery.firebaseio.com/orders.json')
            .then(response => {
                const orders = [...getState().adminConsole.orders];
                let isNewOrder = false;
                console.log(response.data);
                for(let key in response.data) {
                    let flag = false;
                    for(let key1 in orders) {
                        if(orders[key1].id === key) {
                            flag = true;
                            break;
                        }
                    }
                    if(!flag) {
                        const order = {
                            id: key,
                            customerName: response.data[key].customerName,
                            email: response.data[key].email,
                            mobileNum: response.data[key].mobilNum,
                            address: response.data[key].address,
                            images: response.data[key].images,
                            totalPrice: response.data[key].totalPrice,
                            delivered: response.data[key].delivered,
                            date: response.data[key].date
                        }
                        orders.push(order);
                        isNewOrder = true;
                    }
                }
                dispatch(setOrders(orders, isNewOrder));
            }).catch(error => console.log(error));
    }
}