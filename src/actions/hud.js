export const SET_HUD = 'SET_HUD';
export const OPEN_HUD = 'OPEN_HUD';
export const CLOSE_HUD = 'CLOSE_HUD';

export function setHUD(hud) {
	return {
		type: SET_HUD,
		hud
	}
}

export function openHUD() {
	return {
		type: OPEN_HUD
	}
}

export function closeHUD() {
	return {
		type: CLOSE_HUD
	}
}
