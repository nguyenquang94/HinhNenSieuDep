import { combineReducers } from 'redux';
import { root } from './root';
import { nav } from './nav';
import { sidemenu } from './sidemenu';
import { category } from './category';
import { system } from './system';
import { hud } from './hud';
const rootReducer = combineReducers({
	root,
	nav, 
	sidemenu,
	category,
	system,
	hud
})

export default rootReducer;