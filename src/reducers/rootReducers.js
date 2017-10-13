import { combineReducers } from 'redux';
import { root } from './root';
import { nav } from './nav';
import { sidemenu } from './sidemenu';
import { category } from './category';
import { system } from './system';

const rootReducer = combineReducers({
	root,
	nav, 
	sidemenu,
	category,
	system
})

export default rootReducer;