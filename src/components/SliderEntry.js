import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration, link }, parallax, parallaxProps, even } = this.props;
        console.log("-------1", this.props);
        return (
            <Image
              source={{ uri: link }}
              style={styles.image}
              indicator={Progress.Circle} 
            />
        );
    }

    render () {
        const { data: { title, subtitle, link }, even } = this.props;
        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: link }}
                      style={styles.image}
                      indicator={Progress.Circle} 
                    />
                </View>
            </TouchableOpacity>
        );
    }
}
