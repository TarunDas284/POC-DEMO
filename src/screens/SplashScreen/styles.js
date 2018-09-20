import {StyleSheet} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

export default StyleSheet.create({
    rootViewDesign: {
        flex: 1,
        backgroundColor: color.SPLASH_SCREEN_BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    }, textStyle: {
        fontSize: size.FONT_SIZE_M,
        color: color.WHITE
    }
});