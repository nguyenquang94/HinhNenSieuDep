import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import RootScreen from '../RootScreen';
import Swiper from '../SwiperScreen';
import Tabs from '../TabsScreen';
import StartScreen from '../StartScreen';

export const MainNavigator = StackNavigator({
	Root: { screen: RootScreen },
	Start: { screen: StartScreen },
	Swiper: { screen: Swiper },
	Tabs: { screen: Tabs },
}, {
	headerMode: 'none'
});

class MainNavigatorScreen extends Component {
	render() {
		return (
			<MainNavigator navigation={addNavigationHelpers({
				dispatch: this.props.dispatch,
				state: this.props.nav,
			})} />
		);
	}
}

function mapStateToProps(state) {
	return {
		nav: state.nav
	}
}

export default connect(mapStateToProps)(MainNavigatorScreen);