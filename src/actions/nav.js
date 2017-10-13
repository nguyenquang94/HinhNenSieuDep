export const SWITCH_TO_ABSENCE_LIST = 'SWITCH_TO_ABSENCE_LIST';
export const SWITCH_TO_USER_LIST = 'SWITCH_TO_USER_LIST';

export const GO_TO_SWIPER_SCREEN = 'GO_TO_SWIPER_SCREEN';
export const GO_TO_TAP_SCREEN = 'GO_TO_TAP_SCREEN';
export const GO_BACK = 'Navigation/BACK';

export function switchToAbsenceList() {
	return {
		type: SWITCH_TO_ABSENCE_LIST
	};
}

export function switchToUserList() {
	return {
		type: SWITCH_TO_USER_LIST
	};
}

export function goToSwiperScreen() {
	return {
		type: GO_TO_SWIPER_SCREEN
	};
}

export function goToTapScreen() {
	return {
		type: GO_TO_TAP_SCREEN
	};
}

export function goBack() {
	return {
		type: GO_BACK
	}
}