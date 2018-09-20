import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';
import {RESET_PAGE} from '../../constants/NavigationActionConstant';
import AppText from '../../constants/AppText'

class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.rootViewDesign}>
                <Text style={styles.textStyle}>{AppText.SPLASH_SCREEN_TEXT}</Text>
            </View>
        );
    }
    componentDidMount() {
        setTimeout(() => {
            this.setTimePassed();
        }, 3000);
    }

    setTimePassed() {
        this.props.resetPage('HomeScreen');
    }

}

function mapStateToProps(state) {
    return {
        nav: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetPage: (page) => dispatch({type: RESET_PAGE, nextPage: page})
    }
}

SplashScreen.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);