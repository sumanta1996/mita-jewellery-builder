import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories : null,
    orders: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) { 
    case actionTypes.SET_CATEGORIES: 
        return {
            ...state,
            categories: action.categories
        }
    case actionTypes.SET_ORDERS:
        return {
            ...state,
            orders: action.orders
        }
    default:
        return state;
    }
}

export default reducer;