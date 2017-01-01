export const SAVE_CATEGORY_LIST = 'SAVE_CATEGORY_LIST';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

import { AsyncStorage } from 'react-native';
import { goToSwiperScreen } from './nav'
import { Define } from '../Define';
import { closeSideMenu } from './sidemenu';
import { openHUD, closeHUD } from './hud';
import { requestListDataDate, requestListDataRat, requestListDataDow ,selectImageIndex, updateLoading } from './root';

export function receiveCategoryList(data) {
	return {
		type: SAVE_CATEGORY_LIST,
		data 
	};
}

export function selectCategoryIndex(id) {
	return (dispatch, getState) => {
		dispatch(selectCategory(id));
		dispatch(closeSideMenu());
        dispatch(requestListDataDate());
        dispatch(requestListDataRat());
        dispatch(requestListDataDow());
	}
}

export function selectCategory(id) {
	return {
		type: SELECT_CATEGORY,
		id
	}
}


export function requestListCategory() {
	return (dispatch, getState) => {
		dispatch(openHUD());
		fetch('http://api.wallpaperscraft.com/categories?lang=en&limit=100&offset=0' , {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
            },
           })
           .then((response) => response.json())
           .then((responseJson) => {
           	dispatch(closeHUD());
	            dispatch(receiveCategoryList(responseJson.items));
	            return responseJson;
           })
           .catch((error) => {
            	console.error(error);
            	dispatch(closeHUD());
           })
	}
}


