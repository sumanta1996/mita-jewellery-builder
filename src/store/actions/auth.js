import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        err: err
    }
}

export const authCheckTime = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {

        },expiresIn * 1000);
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzpmGpErQqjFeR04n5hFnTT0f8qa-WSW0',authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authCheckTime(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()) {
                dispatch(logout());
            }else {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(authCheckTime((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}