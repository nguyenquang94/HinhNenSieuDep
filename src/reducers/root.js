import { RECIVE_DATA_DATE, RECIVE_DATA_RATING, RECIVE_DATA_DOWNLOAD, SELECT_IMAGE, UPDATE_LOADING, RECIVE_DATA_SEARCH, SELECT_SEARCH_IMAGE  } from '../actions/root';

const defaultState = {
	data_date: [],
	data_rat: [],
	data_down: [],
	loaded: false,
	loading: true,
	lastUpdate: false,
	selected: false,
	type_selected: 1,
	data_search: [],
	selected_search: ''
};

export function root(state = defaultState, action) {
	switch (action.type) {
		case RECIVE_DATA_DATE:
			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				data_date: action.data,
				lastUpdate: new Date(),
			});
		case RECIVE_DATA_RATING:
			return Object.assign({}, state, {
				data_rat: action.data,
			});
		case RECIVE_DATA_SEARCH:
			return Object.assign({}, state, {
				data_search: action.data,
			});
		case UPDATE_LOADING:
			return Object.assign({}, state, {
				loading: true,
			});
		case RECIVE_DATA_DOWNLOAD:
			return Object.assign({}, state, {
				data_down: action.data,
			});
		case SELECT_IMAGE:
			return Object.assign({}, state, {
				selected: action.item,
				type_selected: action.type_go
			});
		case SELECT_SEARCH_IMAGE:
			return Object.assign({}, state, {
				selected_search: action.item,
			});
		default:
			return state;
	}
}