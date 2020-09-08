import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setImages = (images) => {
    return {
        type: actionTypes.SET_IMAGES,
        images: images,
        imagesSet: true
    }
}

export const setImagesStart = () => {
    return {
        type: actionTypes.SET_IMAGES_START,
    }
}

export const setSearchedValue = searchedValue => {
    return {
        type: actionTypes.SET_SEARCHED_VALUE,
        searchedValue: searchedValue
    }
}

export const fetchImages = (categoryValue, searchedValue) => {
    return dispatch => {
        dispatch(setImagesStart());
        const queryParams = '?orderBy="category"&equalTo="' + categoryValue+'"'
        axios.get('https://mita-jewellery.firebaseio.com/posts.json'+queryParams)
        .then(response => {
            const images = [];
            for(let res in response.data) {
                //console.log('[Each iteration]',res);
                console.log(searchedValue)
                if(response.data[res].title.includes(searchedValue)) {
                    images.push({
                        imageId: res,
                        urlArr: response.data[res].url, 
                        categories: response.data[res].Categories,
                        id: response.data[res].id,
                        title: response.data[res].title,
                        description: response.data[res].details,
                        length: response.data[res].length,
                        width: response.data[res].width,
                        height: response.data[res].height,
                        price: response.data[res].price,
                        users: response.data[res].users ? response.data[res].users : {}
                    });          
                }          
            }
            dispatch(setImages(images));
        }).catch(err => console.log(err));
    }
}