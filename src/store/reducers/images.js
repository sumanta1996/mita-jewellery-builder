import * as actionTypes from '../actions/actionTypes';

const initialState = {
    images: null,
    imagesSet: false,
    searchedValue: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IMAGES:
            return {
                ...state,
                images: action.images,
                imagesSet: action.imagesSet
            }
        case actionTypes.SET_IMAGES_START:
            return {
                ...state,
                images: null,
                imagesSet: false
            }
        case actionTypes.SET_SEARCHED_VALUE:
            return {
                ...state,
                searchedValue: action.searchedValue
            }
        default:
            return state;
    }
}

export default reducer;