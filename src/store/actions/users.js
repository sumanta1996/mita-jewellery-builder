import * as actionTypes from './actionTypes';
import axios from 'axios';

export const userLiked = liked => {
    return {
        type: actionTypes.USER_LIKE_SUCCESS,
        liked: liked
    }
}

export const userCommented = () => {
    return {
        type: actionTypes.USER_COMMENT_SUCCESS
    }
}

export const userCommentStart = () => {
    return {
        type: actionTypes.USER_COMMENT_START
    }
}

export const userCommentFail = err => {
    return {
        type: actionTypes.USER_COMMENT_FAIL,
        err: err
    }
}

export const fetchLikesCommentsStart = () => {
    return {
        type: actionTypes.FETCH_LIKES_COMMENTS_START,
    }
}

export const fetchLikesCommentsSuccess = (likes, commentArr, likedPeople, isLiked) => {
    return {
        type: actionTypes.FETCH_LIKES_COMMENTS_SUCCESS,
        likes: likes,
        commentArr: commentArr,
        isLiked: isLiked,
        likedPeople: likedPeople
    }
}

export const userLikingCommentingProcess = (user, isComment) => {
    return dispatch => {
        if (isComment) {
            dispatch(userCommentStart())
        }
        axios.get('https://mita-jewellery.firebaseio.com/posts/' + user.imageId + '/users.json')
            .then(res => {
                let userId = null;
                for (let key in res.data) {
                    if (res.data[key].fullName === user.fullName) {
                        userId = key;
                        break;
                    }
                }
                if (userId) {
                    let data = {}
                    if (isComment) {
                        data = {
                            Comment: user.comment
                        }
                    } else {
                        data = {
                            Liked: user.liked,
                        }
                    }
                    axios.patch('https://mita-jewellery.firebaseio.com/posts/' + user.imageId + '/users/' + userId + '/.json', data)
                        .then(res => {
                            dispatch(fetchLikesComments(user.imageId));
                            isComment ? dispatch(userCommented()) : dispatch(userLiked(user.liked));
                        }).catch(err => {
                            if (isComment) {
                                dispatch(userCommentFail(err));
                            } else {
                                console.log(err);
                            }
                        });
                } else {
                    let data = {}
                    if (isComment) {
                        data = {
                            Comment: user.comment,
                            fullName: user.fullName
                        }
                    } else {
                        data = {
                            Liked: user.liked,
                            fullName: user.fullName
                        }
                    }
                    axios.post('https://mita-jewellery.firebaseio.com/posts/' + user.imageId + '/users/.json', data)
                        .then(res => {
                            dispatch(fetchLikesComments(user.imageId));
                            isComment ? dispatch(userCommented()) : dispatch(userLiked());
                        }).catch(err => {
                            if (isComment) {
                                dispatch(userCommentFail(err));
                            } else {
                                console.log(err);
                            }
                        });
                }
            })
    }
}

export const fetchLikesComments = imageId => {
    return (dispatch, getState) => {
        dispatch(fetchLikesCommentsStart());
        axios.get('https://mita-jewellery.firebaseio.com/posts/' + imageId + '/users.json')
        .then(res => {
            let isLiked = false;
            let likes = 0;
            let commentArr = [];
            let likedPeople = [];
            for (let key in res.data) {
                if (res.data[key].Liked) {
                    ++ likes ;
                    res.data[key].fullName !== '' ? likedPeople.push(res.data[key].fullName): null;
                }
                if(res.data[key].Comment){
                    commentArr.push({comment: res.data[key].Comment, like: res.data[key].Liked, name: res.data[key].fullName});
                }
                if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
                    if(res.data[key].fullName === localStorage.getItem('userData')){
                        isLiked = res.data[key].Liked;
                    }
                }
                
            }
            dispatch(fetchLikesCommentsSuccess(likes, commentArr, likedPeople, isLiked));
        }).catch(err => console.log(err));
    }
}

export const saveUsername = username => {
    return {
        type: actionTypes.SAVE_USERNAME,
        username: username
    }
}