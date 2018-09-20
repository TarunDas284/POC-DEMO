import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';
import {RESET_PAGE} from '../../constants/NavigationActionConstant';
import {getCurrentLocation} from '../../components/LocationController';
import MapView, {Circle, Marker} from "react-native-maps";
import size from '../../constants/Size';
import color from '../../constants/Color';
import {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import Slider from "react-native-slider";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton/CustomButton';
import headerBackStyle from '../../components/BackToolbar/BackToolbarStyle';
import Loader from '../../components/CustomLoader/LoaderPreview';
import {
    DEFAULT_GREEN_CIRCLE_RADIUS,
    DEFAULT_WHITE_CIRCLE_RADIUS,
    DEFAULT_GRAY_CIRCLE_RADIUS,
    MINIMUM_ZOOM_LEVEL,
    SLIDER_MINIMUM_VALUE,
    SLIDER_MAXIMUM_VALUE
} from '../../constants/LocationConstant';
import AppText from '../../constants/AppText';
import {getNetworkAvailablity} from '../../components/InternetConnectivity';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let latitude = 0;
let longitude = 0;

class LocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLocationAvailable: false,
            grayCircleRadius: parseInt(DEFAULT_GRAY_CIRCLE_RADIUS / MINIMUM_ZOOM_LEVEL),
            value: DEFAULT_GRAY_CIRCLE_RADIUS,
            whiteRadius: DEFAULT_WHITE_CIRCLE_RADIUS,
            greenCricleRadius: DEFAULT_GREEN_CIRCLE_RADIUS,
            isLocationLoading: true,
            isInitialLoad: true,
            isNetworkAvailable: false
        }
    }

    render() {
        let region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };

        let center = {
            latitude: latitude,
            longitude: longitude,
        };

        let bodyView = null;

        if (!this.state.isInitialLoad) {
            if (this.state.isNetworkAvailable) {
                if (this.state.isLocationAvailable) {
                    bodyView =
                        <ScrollView style={StyleSheet.absoluteFill}>
                            <View>
                                <MapView
                                    style={styles.mapStyle}
                                    minZoomLevel={MINIMUM_ZOOM_LEVEL}
                                    initialRegion={region}>

                                    <Marker
                                        pinColor={color.PIN_COLOR}
                                        coordinate={region}/>

                                    <Circle
                                        center={center}
                                        radius={this.state.grayCircleRadius}
                                        fillColor="rgba(255, 255, 255, 0.5)"
                                        strokeColor="rgba(0,0,0,0)"
                                        zIndex={2}
                                        strokeWidth={2}/>

                                    <Circle
                                        center={center}
                                        radius={this.state.greenCricleRadius}
                                        fillColor="rgba(113, 233, 129, 0.6)"
                                        strokeColor="rgba(0,0,0,0)"
                                        zIndex={2}
                                        strokeWidth={2}/>

                                    <Circle
                                        center={center}
                                        radius={this.state.whiteRadius}
                                        fillColor="rgba(255, 255, 255, 1)"
                                        strokeColor="rgba(0,0,0,0)"
                                        zIndex={2}
                                        strokeWidth={2}/>
                                </MapView>

                                <View style={styles.bottomRootStyle}>
                                    <Text style={styles.radiusLabelStyle}>{AppText.RADIUS_TEXT}</Text>
                                    <Slider
                                        value={this.state.value}
                                        minimumValue={SLIDER_MINIMUM_VALUE}
                                        maximumValue={SLIDER_MAXIMUM_VALUE}
                                        thumbTintColor='#44FFFA'
                                        minimumTrackTintColor='#44FFFA'
                                        step={1}
                                        onValueChange={value => this.setState({grayCircleRadius: parseInt(value / MINIMUM_ZOOM_LEVEL)})}/>

                                    <View style={styles.radiusValueRootStyle}>
                                        <Text
                                            style={[{flex: 1}, styles.radiusValueStyle]}>{SLIDER_MINIMUM_VALUE} m</Text>
                                        <Text style={styles.radiusValueStyle}>{SLIDER_MAXIMUM_VALUE / 1000} km</Text>
                                    </View>
                                    <CustomButton pressButton={this.refreshLocation}
                                                  title={AppText.REFRESH_LOCATION}/>
                                </View>
                            </View>
                        </ScrollView>
                } else {
                    bodyView =
                        <View style={styles.locationNotAvailableRootStyle}>
                            <View style={styles.locationImageRootStyle}>
                                <MaterialIcon name="location-off" size={size.NOT_FOUND_ICON_SIZE}
                                              color={color.BLACK}/>
                            </View>
                            <Text style={styles.locationNotAvailableTextStyle}>
                                {this.state.isLocationLoading ? AppText.GETTING_LOCATION : AppText.LOCATION_NOT_AVAILABLE}
                            </Text>
                            <CustomButton pressButton={this.refreshLocation}
                                          title={AppText.REFRESH_LOCATION}/>
                        </View>

                }
            } else {
                bodyView =
                    <View style={styles.locationNotAvailableRootStyle}>
                        <View style={styles.locationImageRootStyle}>
                            <MaterialCommunityIcons name="wifi-off" size={size.NOT_FOUND_ICON_SIZE}
                                                    color={color.BLACK}/>
                        </View>
                        <Text style={styles.locationNotAvailableTextStyle}>
                            {AppText.TURN_ON_INTERNET}
                        </Text>
                        <CustomButton pressButton={this.refreshLocation} title={AppText.REFRESH_LOCATION}/>
                    </View>
            }
        } else {
            bodyView = null;
        }

        return (
            <View style={styles.rootViewDesign}>
                {bodyView}
                <Loader/>
            </View>
        );
    }

    refreshLocation = () => {
        this.networkConnectivityCheck();
    }

    getLocation() {
        getCurrentLocation(response => {
            if (response.success) {
                console.log(response);
                latitude = parseFloat(response.latitude);
                longitude = parseFloat(response.longitude)
                this.setState({
                    isLocationAvailable: true,
                    isLocationLoading: false
                })
            } else {
                this.setState({
                    isLocationAvailable: false,
                    isLocationLoading: false
                })
            }
        });
    }

    componentDidMount() {
        this.networkConnectivityCheck();
    }

    networkConnectivityCheck() {
        getNetworkAvailablity(isAvailable => {
            if (isAvailable) {
                this.setState({
                    isInitialLoad: false,
                    isNetworkAvailable: true,
                    isLocationLoading: true
                }, () => {
                    this.getLocation();
                })
            } else {
                this.setState({
                    isInitialLoad: false,
                    isNetworkAvailable: false
                })
            }
        });
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

LocationScreen.navigationOptions = {
    title: "Location",
    headerStyle: headerBackStyle.headerStyle,
    headerTitleStyle: headerBackStyle.headerTitleStyle,
    headerTintColor: color.DARK_GRAY
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);