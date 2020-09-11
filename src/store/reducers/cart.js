import * as actionTypes from '../actions/actionTypes';

const initialState = {
    images: [],
    isLoading: false,
    success: false,
    failure: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                images: [...state.images, action.image]
            };
        case actionTypes.REMOVE_FROM_CART:
            const updatedImages = [...state.images].filter(image => image.imageId !== action.imageId);
            return {
                ...state,
                images: updatedImages
            }
        case actionTypes.SAVE_DATA_START:
            return {
                ...state,
                isLoading: true,
                success: false,
            }
        case actionTypes.SAVE_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true
            }
        case actionTypes.SAVE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
            }
        default:
            return state;
    }

}

export default reducer;