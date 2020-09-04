import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories
    }
}

export const fetchCategories = () => {
    return dispatch => {
        axios.get('https://mita-jewellery.firebaseio.com/Categories.json')
        .then(response => {
            const categories = [];
            for(let key in response.data) {
                categories.push({value: key, displayValue: response.data[key]})
            }
            dispatch(setCategories(categories));
        }).catch(err => console.log(err));
    }
}