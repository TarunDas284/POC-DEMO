import {StyleSheet, Dimensions, Platform} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

export default StyleSheet.create({
    rootViewDesign: {
        flex: 1,
        backgroundColor: color.WHITE
    }, innerRootStyle: {
        padding: 10,
        flex: 1
    }, headerRootStyle: {
        alignItems: 'center'
    }, headerRoundViewStyle: {
        height: 50,
        width: 200,
        borderRadius: 20,
        backgroundColor: color.DARK_GRAY,
        justifyContent: 'center',
        alignItems: 'center'
    }, headerTextStyle: {
        color: color.WHITE,
        fontSize: size.FONT_SIZE_M,
        fontWeight: 'bold'
    },slider: {
        marginTop: 15,
        overflow: 'visible'
    },sliderContentContainer: {
        paddingVertical: 10
    },sliderContainer: {
        paddingVertical: 30
    }
});