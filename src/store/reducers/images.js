import * as actionTypes from '../actions/actionTypes';

const initialState = {
    images: null,
    imagesSet: false
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
        default:
            return state;
    }
}

export default reducer;