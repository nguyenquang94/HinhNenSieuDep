import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';

import { openSideMenu } from './actions/sidemenu'
import { switchToAbsenceList, switchToUserList } from './actions/nav'
import LinearGradient from 'react-native-linear-gradient';
import{ StyleSheet, View, TouchableOpacity } from 'react-native';
import { selectCategoryIndex } from './actions/category';

class SideMenuScreen extends Component {
	render() {
		return (
			<StyleProvider style={getTheme(material)}>
			    <Container>
			        <LinearGradient colors={['rgba(0, 0, 0, 0.6)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
						<View style={styles.container}>
							<Content style={styles.drawerList}>
								<View style={{paddingTop: 100}}>
								<TouchableOpacity underlayColor={'rgba(0, 0, 0, 0.6)'} onPress={ ()=> this.props.dispatch(selectCategoryIndex(0))} style={{height: 45, padding: 10,
									backgroundColor: (this.checkCurrentCategory(0))? '#666666':'rgba(0, 0, 0, 0.6)'}}>
									<Text style={{color: 'white'}}>All</Text>
								</TouchableOpacity>
								{this.renderListMenu()}
								</View>
							</Content>
							<Text style={styles._version}>
								{/* 'v1.0.0' */}
							</Text>
						</View>
					</LinearGradient>
			    </Container>
			</StyleProvider>
		);
	}

	renderListMenu() {
		const { dispatch, category } = this.props;
		var renderContent = [];
		if (category && category.data.length > 0) {
			category.data.map((category) => {
				renderContent.push(
					<TouchableOpacity underlayColor={'rgba(0, 0, 0, 0.6)'} onPress={ ()=> dispatch(selectCategoryIndex(category.id))} key={category.id} style={{height: 45, padding: 10,
						backgroundColor: (this.checkCurrentCategory(category.id))? '#666666':'rgba(0, 0, 0, 0.6)'
					}}>
						<Text style={{color: 'white'}}>{category.title}</Text>
					</TouchableOpacity>
				);
			});
		}
		return renderContent;
	}

	checkCurrentCategory(id) {
		const { category } = this.props;
		var current = category.selected;
		if(id == current) {
			return true;
		} 
		return false;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	drawerList: {

	},
	drawerListIcon: {
		width: 27
	},
	drawerListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 23
	},
	drawerListItemText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 23,
		paddingLeft: 15,
		flex: 1
	},
	linearGradient: {
		// top: 0,
		// left: 0,
		// right: 0,
		// height: 248,
		// position: 'absolute'
		flex: 1
	},
	_version: {
		color: '#3c3c3c',
		position: 'absolute',
		bottom: 25,
		marginLeft: 53
	}
});


function mapStateToProps(state) {
	const {
		rootScreen,
		me, 
		category
	} = state;

	return {
		rootScreen,
		me,
		category
	}
}

export default connect(mapStateToProps)(SideMenuScreen)