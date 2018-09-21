import React, {Component} from 'react';
import {View, Image, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class SlideItem extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    render() {
        const {data: {imageURL}, even} = this.props;

        let rotateStyle = null;
        if (this.props.activeSlide === 0 && this.props.totalSize === 1) {
            rotateStyle = null;
        }if (this.props.activeSlide === 0) {
            if (this.props.index === this.props.activeSlide + 1) {
                rotateStyle = styles.rotateViewRight;
            }
        } else if (this.props.activeSlide === this.props.totalSize - 1) {
            if (this.props.index === this.props.activeSlide - 1) {
                rotateStyle = styles.rotateViewLeft;
            }
        } else {
            if (this.props.index === this.props.activeSlide - 1) {
                rotateStyle = styles.rotateViewLeft;
            } else if (this.props.index === this.props.activeSlide + 1) {
                rotateStyle = styles.rotateViewRight;
            }
        }

        return (
            <TouchableHighlight
                activeOpacity={1}
                style={[styles.slideInnerContainer, rotateStyle]}
                onPress={() => console.log("press")}>
                <View style={{flex: 1}}>
                    <View style={styles.shadow}/>
                    <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                        <Image
                            source={{uri: imageURL}}
                            style={styles.image}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}