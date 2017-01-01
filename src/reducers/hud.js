import { SET_HUD, OPEN_HUD, CLOSE_HUD } from '../actions/hud';

const defaultState = {
	hud: false
}

export function hud(state = defaultState, action) {
	switch (action.type) {
		case SET_HUD:
			if (action.hud && !state.hud) {
				state.hud = action.hud;
			}
			return state;
		case OPEN_HUD:
			if (state.hud) {
				state.hud.show();
			}
			return state;
		case CLOSE_HUD:
			if (state.hud) {
				state.hud.hide();
			}
			return state;
		default:
			return state;
	}
}