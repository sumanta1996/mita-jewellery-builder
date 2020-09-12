import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories : null,
    orders: [],
    isNewOrder: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) { 
    case actionTypes.SET_CATEGORIES: 
        return {
            ...state,
            categories: action.categories
        }
    case actionTypes.SET_ORDERS_START: 
        return {
            ...state,
            isNewOrder: false
        }
    case actionTypes.SET_ORDERS:
        return {
            ...state,
            orders: action.orders,
            isNewOrder: action.isNewOrder
        }
    default:
        return state;
    }
}

export default reducer;