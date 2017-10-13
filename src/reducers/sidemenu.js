import { SET_SIDEMENU, OPEN_SIDEMENU, CLOSE_SIDEMENU, ALLOW_SHOW_MENU } from '../actions/sidemenu';

const defaultState = {
	drawer: false,
	allowShowMenu: false
}

export function sidemenu(state = defaultState, action) {
	switch (action.type) {
		case SET_SIDEMENU:
			if (action.sidemenu)
			{
				state.drawer = action.sidemenu;
			}
			return state;

		case OPEN_SIDEMENU:
			if (state.drawer._root)
			{
				state.drawer._root.open();
			}
			return state;

		case CLOSE_SIDEMENU:
			if (state.drawer._root)
			{
				state.drawer._root.close();
			}
			return state;
		case ALLOW_SHOW_MENU:
			return Object.assign({}, state, { allowShowMenu: action.allowShowMenu });

		default:
			return state;
	}
}