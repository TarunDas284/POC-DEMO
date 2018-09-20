import React from 'react';
import {StackNavigator} from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/Home';
import LocationScreen from '../screens/LocationScreen';

const AppNavigator = StackNavigator({
    SplashScreen: {
        screen: SplashScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    }, HomeScreen: {
        screen: HomeScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },LocationScreen: {
        screen: LocationScreen, navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    }
});

export default AppNavigator;