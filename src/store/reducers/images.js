import * as actionTypes from '../actions/actionTypes';

const initialState = {
    images: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_IMAGES : 
            return {
                ...state,
                images: action.images
            }
        default:
            return state;
    }
}

export default reducer;