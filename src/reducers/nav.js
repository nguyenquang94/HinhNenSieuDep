import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { MainNavigator } from '../navigators/MainNavigator';
import { NavigationActions } from 'react-navigation';

import {
	GO_TO_TAP_SCREEN,
	GO_TO_SWIPER_SCREEN,
	GO_TO_RESULT_SCREEN,
	GO_TO_SWIPER_RESULT_SCREEN
} from '../actions/nav';

const firstAction = MainNavigator.router.getActionForPathAndParams('Root');
const tempNavState = MainNavigator.router.getStateForAction(firstAction);


export function nav(state = tempNavState, action)
{
	switch (action.type)
	{
		case GO_TO_SWIPER_SCREEN: 
			return MainNavigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: "Swiper" }),
				state
			);
		case GO_TO_TAP_SCREEN: 
			return MainNavigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: "Tabs" }),
				state
			);
		case GO_TO_RESULT_SCREEN: 
			return MainNavigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: "SearchResult" }),
				state
			);
		case GO_TO_SWIPER_RESULT_SCREEN: 
			return MainNavigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: "SwiperSearchResult" }),
				state
			);
		case 'Navigation/BACK':
			return MainNavigator.router.getStateForAction(
				NavigationActions.back(),
				state
			);
		default:
			return state;
	}
}

export function rootScreen(state = "dashboard", action) {
	switch (action.type) {
		case SWITCH_TO_ABSENCE_LIST:
			return "absence_list";
		default:
			return state;
	}
}