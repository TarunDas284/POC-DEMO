import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LottieAnim from 'lottie-react-native';
import Loader from '../../assets/Loader/simple_loader';

class LottieLoader extends Component {
    componentDidMount() {
        this.animation.play()
    }

    render() {
        return (
            <View>
                <LottieAnim
                    ref = {animation => this.animation = animation}
                    style = {{width: 80, height: 80}}
                    loop = {true}
                    source = {Loader}
                />
            </View>
        );
    }
}

export default LottieLoader;