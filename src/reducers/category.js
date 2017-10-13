import { SAVE_CATEGORY_LIST, SELECT_CATEGORY } from '../actions/category';

const defaultState = {
	data: [],
	loaded: false,
	loading: true,
	lastUpdate: false,
	selected: 0
};

export function category(state = defaultState, action) {
	switch (action.type) {
		case SAVE_CATEGORY_LIST:
			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				data: action.data,
				lastUpdate: new Date(),
			});
		case SELECT_CATEGORY:
			return Object.assign({}, state, {
				selected: action.id
			});
		default:
			return state;
	}
}