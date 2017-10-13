import { SAVE_PIXEL } from '../actions/system';

const defaultState = {
	data: []
};

export function system(state = defaultState, action) {
	switch (action.type) {
		case SAVE_PIXEL:
			return Object.assign({}, state, {
				data: action.data,
			});
		default:
			return state;
	}
}