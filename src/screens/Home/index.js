import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';
import AppText from '../../constants/AppText'
import CustomButton from '../../components/CustomButton/CustomButton';
import {NEXT_PAGE} from '../../constants/NavigationActionConstant';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.rootViewDesign}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <Text>Home</Text>
                </ScrollView>
                <CustomButton pressButton={this.gotoLocationPage.bind(this)} title={AppText.SHOW_MY_LOCATION_BUTTON_TEXT}/>
            </View>
        );
    }

    gotoLocationPage() {
        this.props.goToNextPage('LocationScreen');
    }
}

function mapStateToProps(state) {
    return {
        nav: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page})
    }
}

HomeScreen.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);