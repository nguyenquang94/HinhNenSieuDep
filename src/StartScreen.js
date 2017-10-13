import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Image, Text, View, Dimensions} from 'react-native';
import { goToTapScreen } from './actions/nav'
import * as Animatable from 'react-native-animatable';
import { Spinner } from 'native-base';
var win = Dimensions.get('window');
var load;
var load1;
import { requestListCategory } from './actions/category';
var win = Dimensions.get('window');
import getPixelDimensions from 'react-native-get-pixel-dimensions'
import { getPixel } from './actions/system'
export class StartScreen extends Component {

	constructor (props) {
        super(props);
        this.state = {
           visibale: false,
           loading: true,
        };
    }

    componentDidMount() {
        var size =getPixelDimensions();
        this.props.dispatch(requestListCategory());
        this.props.dispatch(getPixel(size))
   		load=setInterval(() => {
            this.props.dispatch(goToTapScreen());
            this.setState({loading : false})
            clearInterval(load);
        }, 3500);
        load1=setInterval(() => {
            this.setState({visibale : true})
            clearInterval(load1);
        }, 1500);
    }

    componentWillUnmount(){
        
    }


    render() {
        var size =getPixelDimensions();
        return(
            <Image source={require('./bg.jpg')} style={{flex: 1, width: null, 
            height: null, backgroundColor: 'rgba(0,0,0,0)', resizeMode: 'stretch', alignItems: 'center'}} >
            	{(this.state.visibale==true) &&
					(
					<Animatable.Text style={{marginTop: 80, alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}  animation="slideInUp" iterationCount={1} direction="normal">
	            		<Image source={require('./icon.png')} style={{flex: 1, width: 400, 
           				 height: 400}} />
	            	</Animatable.Text>
					)
				}

				 {(this.state.loading==true) &&
                    (
                        <Spinner style={{
                        	position: 'absolute',
                        				top: 300,
                                        justifyContent: 'center',
                                        left: win.width/2 -18,
                                        alignItems: 'center'}}/>
                    )
                    }
                <Text style={{position: 'absolute', bottom: 50, color: 'white', fontSize: 20}}>Your Screen: {size.width} - {size.height}</Text>
            </Image>
        );   
    }
}

function mapStateToProps(state) {
  const {
    rootScreen,
    category
  } = state;

  return {
    rootScreen,
    category
  }
}

export default connect(mapStateToProps)(StartScreen)
