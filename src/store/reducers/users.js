import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: '',
    started: false,
    error: null,
    likes: 0,
    isLiked: false,
    commentArr: [],
    likedPeople: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_COMMENT_START:
            return {
                ...state,
                started: true,
                error: null
            }
        case actionTypes.USER_COMMENT_SUCCESS:
            return {
                ...state,
                started: false,
                error: null
            }
        case actionTypes.USER_COMMENT_FAIL:
            return {
                ...state,
                started: false,
                error: action.err
            }
        case actionTypes.SAVE_USERNAME:
            return {
                ...state,
                username: action.username,
                error: null
            }
        case actionTypes.USER_LIKE_SUCCESS:
            return {
                ...state,
                error: null,
                isLiked: action.liked
            }
        case actionTypes.FETCH_LIKES_COMMENTS_START:
            return {
                ...state,
                likes: 0,
                error: null,
                isLiked: false,
                likedPeople: null
            }
        case actionTypes.FETCH_LIKES_COMMENTS_SUCCESS:
            return {
                ...state,
                likes: action.likes,
                commentArr: action.commentArr,
                isLiked: action.isLiked, 
                likedPeople: action.likedPeople,
                error: null
            }
        default:
            return state;
    }
}

export default reducer;