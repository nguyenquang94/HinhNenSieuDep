import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ScrollView, StatusBar, Platform , Dimensions, TouchableOpacity, ActivityIndicator, BackHandler, NativeModules, TouchableHighlight, Image, CameraRoll} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
var Swiper = require('react-native-swiper');
import {checkPermission, requestPermission} from 'react-native-android-permissions';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import { AdMobBanner } from 'react-native-admob';
import * as Progress from 'react-native-progress';
import { Left, Right, Body, Title, Container, Header, Content, Button, Text, Icon, Fab, Segment, Tabs, Tab, Spinner, StyleProvider, Toast } from 'native-base';
import GridView from 'react-native-grid-view'

import ActionButton from 'react-native-action-button';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import { goBack } from './actions/nav';
import RNFetchBlob from 'react-native-fetch-blob';
import WallPaperManager from 'react-native-wallpaper-manager';

var win = Dimensions.get('window');
export class RootScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
            active: false,
            swiper:Object,
            currentIndex:'',
            loaded: false,
            show: true,
            isLoading: false
        };
    }

    setTypeData() {
        if (this.props.root.type_selected == 1) {
            this.state.data = this.props.root.data_date;
        } else if (this.props.root.type_selected == 2) {
            this.state.data = this.props.root.data_rat;
        } else {
            this.state.data = this.props.root.data_down;
        }
        this.setState(this.state);
        this.checkPosition();
    }

    checkPosition() {
        for( var i in this.state.data ) {
            if (this.state.data[i].id == this.props.root.selected.id) {
                    this.state.currentIndex = i +'';
                    this.state.loaded = true;
                    this.setState(this.state);
            }
        }
        this.setState(this.state);
    }
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.props.dispatch(goBack()));
    }
    componentDidMount() {
        this.setTypeData();
    
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
        checkPermission("android.permission.READ_EXTERNAL_STORAGE").then((result) => {
              console.log("Already Granted!");
              console.log(result);
        }, (result) => {
            console.log("Not Granted!");
            console.log(result);
            requestPermission("android.permission.READ_EXTERNAL_STORAGE").then((result) => {
                console.log("Granted!", result);
              // now you can set the listenner to watch the user geo location
            }, (result) => {
                console.log("Not Granted!");
               console.log(result);
            });
          });
    }

    render() {
        const { root, dispatch } = this.props;
        console.log('dasdasdasdas', this.state.isLoading);
        if (this.state.loaded == true) {
            return(
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <View style={styles.container}>
                        { this.gradient }
                        <Swiper
                            dot={<Button transparent light style={{position: 'absolute', width:1, height: 1}}></Button>}
                            activeDot={<Button transparent light style={{position: 'absolute', width:1, height: 1}} />}
                            loop={false}
                            index={this.state.currentIndex}>
                            {this.state.data.map((wallpaper, index) => {
                                return(
                                    <View>
                                    <Image 
                                        source={{ uri: wallpaper.variations.preview_small.url }} 
                                        style={{
                                            backgroundColor: '#f1f1f1',
                                            width: win.width, 
                                            height: win.height,
                                    }}/>
                                    {(this.state.show==true) &&
                                    (
                                         <View style={{ opacity: 0.6 ,alignItems: 'center', bottom: 70, position: 'absolute', width: win.width, height: 45, backgroundColor: '#0B0E18' }}>
                                                
                                            <Right style={{position: 'absolute', right: 0,alignItems: 'center', alignSelf: 'center'}}>
                                                { this.state.isLoading ? <ActivityIndicator style={{width: 20, height: 20, marginRight: 35, marginTop: 10}} size="large" color={ 'white' } /> : (
                                                    <Button  transparent onPress={() => this.dowloadImage(wallpaper.variations.preview_small.url)}>
                                                        <Text style={{color: 'white', marginRight: 10}}>Tải Xuống</Text>
                                                    </Button>
                                                )}
                                            </Right>

                                            </View> 
                                        )
                                     }
                                    </View>
                                );
                            })}
                        </Swiper>
                        
                         {(this.state.show==true) &&
                            (
                                <View style={{ opacity: 0.45 ,alignItems: 'center', top: 0, position: 'absolute', width: win.width, height: 45, backgroundColor: '#0B0E18' }}>
                                <Button  transparent onPress={() => dispatch(goBack())}>
                                    <Icon style={{color: 'white'}} name='md-arrow-down' />
                                </Button>
                                <Right style={{position: 'absolute', right: 0}}>
                                    <Button  transparent onPress={() => this.onPressImage()}>
                                        <Icon style={{color: 'white'}} name='ios-expand-outline' />
                                    </Button>
                                </Right>
                                </View> 
                            )
                         }
                         {(this.state.show==false) &&
                            (
                                <View style={{ alignItems: 'center', top: 0, position: 'absolute', width: win.width, height: 45 }}>
                                <Right style={{position: 'absolute', right: 0}}>
                                    <Button  transparent onPress={() => this.onPressImage()}>
                                        <Icon style={{color: 'black'}} name='ios-expand-outline' />
                                    </Button>
                                </Right>
                                </View> 
                            )
                         }
                          
                         {(this.state.show==true) &&
                            (
                                <View style={{ alignItems: 'center', bottom: 0, position: 'absolute' }}>
                                <AdMobBanner
                                    bannerSize="smartBannerPortrait"
                                    adUnitID="ca-app-pub-4929245687295341/2473004076"
                                    testDeviceID="EMULATOR"
                                    didFailToReceiveAdWithError={this.bannerError}/>
                             </View> 
                            )
                         }
                            
                    </View>
                </Container>
            </StyleProvider>
            );
        } else {
            return (<View />);
        }
        
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
                var cacheImagePath = res.path();
                console.log(cacheImagePath);
                var promise = CameraRoll.saveToCameraRoll(cacheImagePath);
                promise.then(function(result) {
                  Toast.show({ text: 'Thành công, ảnh đã lưu vào thư viện!', position: 'top', type: 'success', duration: 4000, buttonText: 'Ok'});
                }).catch(function(error) {
                  Toast.show({ text: 'Thử lại sau!', position: 'top', type: 'warning', duration: 4000, buttonText: 'Ok'});
                });
                this.setState.isLoading = false;
                this.state.local_file = res.path();
                this.setState(this.state);
                this.setState({isLoading: false});
            })
    }

    setWallpaper(link) {
        WallPaperManager.setWallPaper({uri: link}, (res)=> console.log(res));
    }

    onPressImage() {
        this.state.show = !this.state.show;
        this.setState(this.state);
    }

}

function mapStateToProps(state) {
  const {
    rootScreen,
    root,
  } = state;

  return {
    rootScreen,
    root
  }
}

export default connect(mapStateToProps)(RootScreen)
