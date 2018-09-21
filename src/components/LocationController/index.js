import {Platform, PermissionsAndroid} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import loaderHandler from '../CustomLoader/LoaderHandler';
import AppText from '../../constants/AppText';

export function locationAccessPermission(responseCallback) {
    if (Platform.OS === "android") {
        if (Platform.Version > 22) {
            Promise.resolve(
                PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
            ).then(async value => {
                if (value) {
                    return responseCallback(true)
                } else {
                    const response = await showPermissionPopup();
                    return responseCallback(response)
                }
            });
        } else {
            return responseCallback(true)
        }
    }
};

async function showPermissionPopup() {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

export const setLocationDialogBox = (responseCallBack) => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
            "<h2>" +
            AppText.USE_LOCATION +
            "</h2>" +
            AppText.TURN_ON_GPS +
            "<br/><br/>",
        ok: "Yes",
        cancel: "No",
        showDialog: true,
        preventOutSideTouch: true,
        preventBackClick: true
    }).then(
        function (success) {
            loaderHandler.showLoader("Wait for location");
            navigator.geolocation.getCurrentPosition(
                position => {
                    loaderHandler.hideLoader();
                    let formattedLatitude = parseFloat(
                        position.coords.latitude
                    ).toFixed(6);
                    let formattedLongitude = parseFloat(
                        position.coords.longitude
                    ).toFixed(6);
                    return responseCallBack({
                        success: true,
                        data: {latitude: formattedLatitude, longitude: formattedLongitude}
                    })
                },
                error => {
                    loaderHandler.hideLoader();
                    return responseCallBack({success: false})
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000}
            );
        }.bind(this)
    )
        .catch(error => {
            return responseCallBack({success: false})
        });
};


export function requestForLocation(responseCallBack) {
    locationAccessPermission(responsePermission => {
        if (responsePermission) {
            setLocationDialogBox(responseDialog => {
                if (responseDialog.success) {
                    let latitude = responseDialog.data.latitude;
                    let longitude = responseDialog.data.longitude;
                    return responseCallBack({
                        success: true,
                        latitude: latitude,
                        longitude: longitude
                    });

                } else {
                    return responseCallBack({success: false});
                }
            })
        } else {
            return responseCallBack({success: false});
        }
    });

};

export function getCurrentLocation(responseCallBack) {
    requestForLocation(response => {
        if (response.success) {
            return responseCallBack({
                success: true,
                latitude: response.latitude,
                longitude: response.longitude
            });
        } else {
            return responseCallBack({success: false});
        }
    })
}