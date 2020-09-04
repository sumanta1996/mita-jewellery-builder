import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories : null
}

const reducer = (state = initialState, action) => {
    switch(action.type) { 
    case actionTypes.SET_CATEGORIES: 
        return {
            ...state,
            categories: action.categories
        }
    default:
        return state;
    }
}

export default reducer;