export const SAVE_PIXEL = 'SAVE_PIXEL';

export function receivePixell(data) {
	return {
		type: SAVE_PIXEL,
		data 
	};
}

export function getPixel(data) {
	return (dispatch, getState) => {
		dispatch(receivePixell(data))
	}
}