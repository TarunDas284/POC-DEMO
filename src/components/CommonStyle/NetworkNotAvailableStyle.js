import {StyleSheet, Dimensions} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

export default StyleSheet.create({
    networkNotAvailabilityTextStyle: {
        textAlign: 'center',
        color: color.BLACK,
        fontSize: size.FONT_SIZE_M
    }, networkNotAvailableRootStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    }, networkImageRootStyle: {
        alignItems: 'center',
        marginBottom: 10
    }
});