import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ScrollView, StatusBar, Platform , Dimensions, TouchableOpacity, TouchableHighlight, PixelRatio, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
var Swiper = require('react-native-swiper');
import {checkPermission, requestPermission} from 'react-native-android-permissions';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import { AdMobBanner } from 'react-native-admob';
import * as Progress from 'react-native-progress';
import { Left, Right, Body, Title, Container, Header, Content, Button, Text, Icon, Fab, Segment, Tabs, Tab, StyleProvider, Spinner, Item, Input } from 'native-base';
import GridView from 'react-native-grid-view'

import { requestListDataDate, requestListDataRat, requestListDataDow ,selectImageIndex, updateLoading, requestSearch, selectSearchImageIndex } from './actions/root';
import ActionButton from 'react-native-action-button';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import { openSideMenu } from './actions/sidemenu';
import { ProgressBar } from './components/ProgressBar';
import PTRView from 'react-native-pull-to-refresh';
import { gotoSearchSwiperResult } from './actions/nav';
import { goBack } from './actions/nav';
var win = Dimensions.get('window');
export class SearchResultScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
            isSearch: false
        };
    }

    get gradient () {
        return (
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }

    get gradientHeader () {
        return (
            <LinearGradient
              colors={['black', 'gray']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }

    render() {
        const { root, dispatch } = this.props;
       
        return(
            <StyleProvider style={getTheme(material)}>
            <Container>
                    {(this.state.isSearch==true) &&
                    (
                        this._renderSearch()
                    )
                    }
                     {(this.state.isSearch==false) &&
                    (
                    <Header style={{backgroundColor: '#0B0E18'}}>
                        <Left>
                           <Button transparent onPress={() => dispatch(goBack())}>
								<Icon style={{color: 'white'}} name='md-arrow-back' />
							</Button>
                        </Left>
                        <Body>
                            <Title>Kết quả tìm kiếm</Title>
                        </Body>
                        <Right>
                            <Button onPress={()=> this.startSearch()} transparent>
                                 <Icon style={{color: 'white'}} name='search' />
                            </Button>
                        </Right>
                    </Header>
                    )
                    }
                <Content style={styles.container}>
                   <GridView
                    items={root.data_search}
                    itemsPerRow={3}
                    renderItem={this.renderItem1.bind(this)}
                    style={{backgroundColor: 'black', marginTop: 5}}
                  />
                     {(root.loading==true) &&
                    (
                        <Spinner style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'}}/>
                    )
                    }
                </Content>
            	<View style={{ alignItems: 'center', bottom: 0, position: 'absolute' }}>
                    <AdMobBanner
                        bannerSize="smartBannerPortrait"
                        adUnitID="ca-app-pub-4929245687295341/2473004076"
                        testDeviceID="EMULATOR"
                        didFailToReceiveAdWithError={this.bannerError}/>
                </View>  
          </Container>
          </StyleProvider>
        );
        
    }

    _renderSearch() {
        return(
            <Header searchBar rounded style={{backgroundColor: '#0B0E18'}}>
                <Item style={{ backgroundColor: 'white', marginTop: 5 }}>
                    <Icon style={{marginTop:3}} name="ios-search" />
                    <Input autoFocus={true} style={{marginTop:3}} onSubmitEditing={(event) => { 
                                    this._loadSearch();
                                }} returnKeyType={'search'} placeholder="Tìm kiếm" onChangeText={(text) => this.updateTextSearch(text)}/>
                    <Button style={{marginBottom: 10}} transparent onPress={() => this.endSearch()}>
                        <Icon name='md-close' />
                    </Button>
                </Item>
                <Button transparent onPress={() => this.endSearch()}>
                    <Icon name='md-close' />
                </Button>
            </Header>
        );
    }

    updateTextSearch(text) {
        this.state.textSearch = text;
        this.setState(this.state)

    }
    _loadSearch() {
        this.props.dispatch(requestSearch(this.state.textSearch, 2));
    }
    getTitle() {
        const {category} = this.props;
        var select = category.selected;
        if (select == 0) {
            return 'All';
        }
        for (var i in category.data) {
            if (category.data[i].id == select) {
                return category.data[i].title;
            }
        }
    }

    startSearch() {
        this.state.isSearch = true;
        this.setState(this.state);
    }
    endSearch() {
        this.state.isSearch = false;
        this.setState(this.state);
    }
    renderItem1(item) {
        return(
            <View key={item.id}>
                <TouchableHighlight onPress={() => { this.props.dispatch(selectSearchImageIndex(item)); this.props.dispatch(gotoSearchSwiperResult())}}>
                    <Image 
                        source={{ uri: item.variations.preview_small.url }} 
                        style={{
                            resizeMode: 'stretch',
                            margin: 1,
                            backgroundColor: '#f1f1f1',
                            width: win.width/3, 
                            height: win.width/2, 
                    }}/>
                </TouchableHighlight>
            </View>
        );
    }

   
    gotoTabsScreen() {

    }
 
    changeView() {
        if (this.props.root.type == 'swiper') {
            this.props.dispatch(changeView('grid'));
        } else {
            this.props.dispatch(changeView('swiper'));
        }
    }

    requestInfoDownloadVideo(image) {
        Alert.alert(
          'Thông báo !',
          'Bạn có muốn tải hình nền này không !',
          [
                  {text: 'Huỷ tải', onPress: () => console.log('OK Pressed')},
                  {text: 'Tải', onPress: () => this.dowloadImage(image)},
          ]
        )
    }

    dowloadImage(link){
        this.setState({isLoading: true});
        let dirs = RNFetchBlob.fs.dirs
        const randomname =   Math.random() * 10000 + ".jpg";
        RNFetchBlob
            .config({
                fileCache: true,
                path: Platform.OS === 'android' ? dirs.DownloadDir + '/images/' + randomname  : '' + dirs.DownloadDir + '/images/' + randomname
            })
            .fetch('GET', link, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
                this.setState.isLoading = false;
                this.state.local_file = res.path();
                this.setState(this.state);
            })
    }

}

function mapStateToProps(state) {
  const {
    rootScreen,
    root,
    category
  } = state;

  return {
    rootScreen,
    root,
    category
  }
}

export default connect(mapStateToProps)(SearchResultScreen)
