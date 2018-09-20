import {StyleSheet, Dimensions} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    rootViewDesign: {
        ...StyleSheet.absoluteFillObject,
        color: color.WHITE
    }, mapStyle: {
        width: width,
        height: 300,
    }, locationNotAvailableTextStyle: {
        textAlign: 'center',
        color: color.BLACK,
        fontSize: size.FONT_SIZE_M
    }, locationNotAvailableRootStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    }, locationImageRootStyle: {
        alignItems: 'center',
        marginBottom: 10
    }, bottomRootStyle: {
        margin: 10
    }, radiusLabelStyle: {
        color: color.BLACK,
        fontWeight: 'bold',
        fontSize: size.FONT_SIZE_M
    }, radiusValueStyle: {
        color: color.BLACK,
        fontSize: size.FONT_SIZE_S
    }, radiusValueRootStyle: {
        flexDirection: 'row'
    }
});