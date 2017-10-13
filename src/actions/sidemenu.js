export const SET_SIDEMENU = 'SET_SIDEMENU';
export const OPEN_SIDEMENU = 'OPEN_SIDEMENU';
export const CLOSE_SIDEMENU = 'CLOSE_SIDEMENU';
export const ALLOW_SHOW_MENU = 'ALLOW_SHOW_MENU';

export function setSideMenu(sidemenu) {
	return {
		type: SET_SIDEMENU,
		sidemenu
	}
}

export function openSideMenu() {
	return {
		type: OPEN_SIDEMENU
	}
}

export function closeSideMenu() {
	return {
		type: CLOSE_SIDEMENU
	}
}

export function allowShowMenu(allowShowMenu) {
	return {
		type: ALLOW_SHOW_MENU,
		allowShowMenu
	}
}