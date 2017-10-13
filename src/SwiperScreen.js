import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ScrollView, StatusBar, Platform , Dimensions, TouchableOpacity, BackHandler, NativeModules, TouchableHighlight, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
var Swiper = require('react-native-swiper');
import {checkPermission, requestPermission} from 'react-native-android-permissions';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import { AdMobBanner } from 'react-native-admob';
import * as Progress from 'react-native-progress';
import { Left, Right, Body, Title, Container, Header, Content, Button, Text, Icon, Fab, Segment, Tabs, Tab, StyleProvider } from 'native-base';
import GridView from 'react-native-grid-view'

import ActionButton from 'react-native-action-button';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import { goBack } from './actions/nav';

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
    }

    render() {
        const { root, dispatch } = this.props;
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
                                    <Image 
                                        source={{ uri: wallpaper.variations.preview_small.url }} 
                                        style={{
                                            backgroundColor: '#f1f1f1',
                                            width: null, 
                                            height: null,
                                            flex: 1, 
                                    }}/>
                                );
                            })}
                        </Swiper>
                            <View style={{ opacity: 0.45 ,alignItems: 'center', top: 0, position: 'absolute', width: win.width, height: 45, backgroundColor: '#0B0E18' }}>
                                <Button  transparent onPress={() => dispatch(goBack())}>
                                    <Icon style={{color: 'white'}} name='md-arrow-down' />
                                </Button>
                            </View> 
                            <View style={{ alignItems: 'center', bottom: 0, position: 'absolute', marginLeft: 20, marginRight: 20 }}>
                                <AdMobBanner
                                    bannerSize="banner"
                                    adUnitID="ca-app-pub-4929245687295341/2473004076"
                                    testDeviceID="EMULATOR"
                                    didFailToReceiveAdWithError={this.bannerError}/>
                            </View> 
                    </View>
                </Container>
            </StyleProvider>
            );
        } else {
            return (<View />);
        }
        
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
