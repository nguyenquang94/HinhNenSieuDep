import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Dimensions, View, StyleSheet } from 'react-native'

import SideMenuScreen from './SideMenuScreen';
import MainNavigator from './navigators/MainNavigator';
import HudView from 'react-native-easy-hud';
import { setHUD } from './actions/hud';

import { setSideMenu, closeSideMenu, allowShowMenu } from './actions/sidemenu';
import { Drawer } from 'native-base';


export class Skeleton extends Component {
	render() {
		const { dispatch, sidemenu } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<Drawer
					ref={(ref) => dispatch(setSideMenu(ref))}
					content={<SideMenuScreen navigator={this.navigator} />}
					onClose={() => dispatch(closeSideMenu())}
				>
					<MainNavigator />
				</Drawer>
				{ this._renderHUD() }
			</View>
		);
	}

	_renderHUD() {
		const { dispatch, sidemenu } = this.props;
		return <HudView
          ref={(hud) => dispatch(setHUD(hud))}
        />
	}

}

const styles = StyleSheet.create({
	hScreen: {
		flex: 1,
		flexDirection: 'row',
	}
});

function mapStateToProps(state) {
	const {
		rootScreen,
	} = state;

	return {
		rootScreen,
	}
}

export default connect(mapStateToProps)(Skeleton)