export const RECIVE_DATA_DATE = 'RECIVE_DATA_DATE';
export const RECIVE_DATA_SEARCH = 'RECIVE_DATA_SEARCH';
export const RECIVE_DATA_RATING = 'RECIVE_DATA_RATING';
export const RECIVE_DATA_DOWNLOAD = 'RECIVE_DATA_DOWNLOAD';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const UPDATE_LOADING = 'UPDATE_LOADING';

import { AsyncStorage } from 'react-native';
import { goToSwiperScreen, gotoSearchResult } from './nav'

export function receiveDataDate(data) {
	return {
		type: RECIVE_DATA_DATE,
		data 
	};
}

export function receiveDataSearch(data) {
	return {
		type: RECIVE_DATA_SEARCH,
		data 
	};
}

export function receiveDataRating(data) {
	return {
		type: RECIVE_DATA_RATING,
		data 
	};
}

export function receiveDataDownLoad(data) {
	return {
		type: RECIVE_DATA_DOWNLOAD,
		data 
	};
}

export function selectImageIndex(item, type_go) {
	return (dispatch, getState) => {
		dispatch(selectImage(item, type_go));
	}
}

export function selectImage(item, type_go) {
	return {
		type: SELECT_IMAGE,
		item, type_go
	}
}


export function updateLoading(status) {
	return (dispatch, getState) => {
		dispatch(reciverLoading(status));
	}
}

export function reciverLoading(status) {
	return {
		type: UPDATE_LOADING,
		status
	}
}


export function requestListDataDate() {
	return (dispatch, getState) => {
		dispatch(updateLoading(true));
		var category_id = getState().category.selected;
		var width = getState().system.data.width;
		var height = getState().system.data.height;
		fetch(`http://api.wallpaperscraft.com/images?screen[width]=${width}&screen[height]=${height}&category_id=${category_id}&sort=date&lang=en&limit=60&offset=0` , {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
            },
           })
           .then((response) => response.json())
           .then((responseJson) => {
	            dispatch(receiveDataDate(responseJson.items));
	            return responseJson;
           })
           .catch((error) => {
            	console.error(error);
           })
	}
}

export function requestListDataRat() {
	return (dispatch, getState) => {
		var category_id = getState().category.selected;
		var width = getState().system.data.width;
		var height = getState().system.data.height;
		fetch(`http://api.wallpaperscraft.com/images?screen[width]=${width}&screen[height]=${height}&category_id=${category_id}&sort=rating&lang=en&limit=60&offset=0` , {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
            },
           })
           .then((response) => response.json())
           .then((responseJson) => {
	            dispatch(receiveDataRating(responseJson.items));
	            return responseJson;
           })
           .catch((error) => {
            	console.error(error);
           })
	}
}

export function requestListDataDow() {
	return (dispatch, getState) => {
		var category_id = getState().category.selected;
		var width = getState().system.data.width;
		var height = getState().system.data.height;
		fetch(`http://api.wallpaperscraft.com/images?screen[width]=${width}&screen[height]=${height}&category_id=${category_id}&sort=download&lang=en&limit=60&offset=0` , {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
            },
           })
           .then((response) => response.json())
           .then((responseJson) => {
	            dispatch(receiveDataDownLoad(responseJson.items));
	            return responseJson;
           })
           .catch((error) => {
            	console.error(error);
           })
	}
}

export function requestSearch(text, type) {
	return (dispatch, getState) => {
		if ( type == 1) {
			dispatch(gotoSearchResult());
		}
		var category_id = getState().category.selected;
		var width = getState().system.data.width;
		var height = getState().system.data.height;
		fetch(`http://api.wallpaperscraft.com/images?query=${text}&screen[width]=${width}&screen[height]=${height}&sort=rating&lang=en&limit=60&offset=0` , {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
            },
           })
           .then((response) => response.json())
           .then((responseJson) => {
	            dispatch(receiveDataSearch(responseJson.items));
	            return responseJson;
           })
           .catch((error) => {
            	console.error(error);
           })
	}
}




