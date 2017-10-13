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
import { Left, Right, Body, Title, Container, Header, Content, Button, Text, Icon, Fab, Segment, Tabs, Tab, StyleProvider, Spinner } from 'native-base';
import GridView from 'react-native-grid-view'

import { requestListDataDate, requestListDataRat, requestListDataDow ,selectImageIndex, updateLoading } from './actions/root';
import ActionButton from 'react-native-action-button';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import { openSideMenu } from './actions/sidemenu';
import { ProgressBar } from './components/ProgressBar';
import PTRView from 'react-native-pull-to-refresh';
import { goToSwiperScreen } from './actions/nav';

var win = Dimensions.get('window');
export class RootScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
            active: false,
            swiper:Object,
            currentIndex:'',
        };
    }

    componentDidMount() {
    
        this.props.dispatch(requestListDataDate());
        this.props.dispatch(requestListDataRat());
        this.props.dispatch(requestListDataDow());

        checkPermission("android.permission.WRITE_EXTERNAL_STORAGE").then((result) => {
              console.log("Already Granted!");
              console.log(result);
        }, (result) => {
            console.log("Not Granted!");
            console.log(result);
            requestPermission("android.permission.WRITE_EXTERNAL_STORAGE").then((result) => {
                console.log("Granted!", result);
              // now you can set the listenner to watch the user geo location
            }, (result) => {
                console.log("Not Granted!");
               console.log(result);
            });
          });
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

    requestData() {
        this.props.dispatch(requestListDataDate());
        this.props.dispatch(requestListDataRat());
        this.props.dispatch(requestListDataDow());
    }

    render() {
        const { root, dispatch } = this.props;
       
        return(
            <StyleProvider style={getTheme(material)}>
            <Container>
                <Header style={{backgroundColor: '#0B0E18'}}>
                    <Left>
                       <Button transparent onPress={() => dispatch(openSideMenu())}>
                           <Icon style={{color: 'white'}} name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.getTitle()}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                             <Icon style={{color: 'white'}} name='search' />
                        </Button>
                    </Right>
            </Header>
           <PTRView onRefresh={() => this.requestData()} refreshing={ root.loading } >
                <Content style={styles.container}>
                    
                    <Tabs initialPage={0} style={{backgroundColor: '#0B0E18'}}  >
                        <Tab heading="Mới Nhất" tabStyle={{backgroundColor: '#0B0E18'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#0B0E18'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}} >
                            <GridView
                                items={root.data_date}
                                itemsPerRow={3}
                                renderItem={this.renderItem1.bind(this)}
                                style={{backgroundColor: 'black'}}
                              />
                        </Tab>
                        <Tab heading="Yêu thích" tabStyle={{backgroundColor: '#0B0E18'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#0B0E18'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}} >
                            <GridView
                                items={root.data_rat}
                                itemsPerRow={3}
                                renderItem={this.renderItem2.bind(this)}
                                style={{backgroundColor: 'black'}}
                              />
                        </Tab>
                        <Tab heading="Phổ biến" tabStyle={{backgroundColor: '#0B0E18'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#0B0E18'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}} >
                            <GridView
                                items={root.data_down}
                                itemsPerRow={3}
                                renderItem={this.renderItem3.bind(this)}
                                style={{backgroundColor: 'black'}}
                              />
                        </Tab>
                    </Tabs> 
                     {(root.loading==true) &&
                    (
                        <Spinner style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'}}/>
                    )
                    }
                </Content>
            </PTRView>
            <View style={{ alignItems: 'center', bottom: 0, position: 'absolute', marginLeft: 20, marginRight: 20 }}>
                        <AdMobBanner
                            bannerSize="banner"
                            adUnitID="ca-app-pub-4929245687295341/2473004076"
                            testDeviceID="EMULATOR"
                            didFailToReceiveAdWithError={this.bannerError}/>
                    </View>  
          </Container>
          </StyleProvider>
        );
        
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

    renderItem1(item) {
        return(
            <View key={item.id}>
                <TouchableHighlight onPress={() => { this.props.dispatch(selectImageIndex(item, 1)); this.props.dispatch(goToSwiperScreen())}}>
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

    renderItem2(item) {
        return(
            <View key={item.id}>
                <TouchableHighlight onPress={() => { this.props.dispatch(selectImageIndex(item, 2)) ; this.props.dispatch(goToSwiperScreen())}}>
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

    renderItem3(item) {
        return(
            <View key={item.id}>
                <TouchableHighlight onPress={() => { this.props.dispatch(selectImageIndex(item, 3)) ; this.props.dispatch(goToSwiperScreen())}}>
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

export default connect(mapStateToProps)(RootScreen)
