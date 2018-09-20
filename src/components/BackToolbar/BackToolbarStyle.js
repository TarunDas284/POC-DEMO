import {StyleSheet} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size'

export default StyleSheet.create({
    headerStyle: {
        backgroundColor: color.WHITE,
        height: 56,
    }, headerTitleStyle: {
        color: color.DARK_GRAY,
        fontSize: size.FONT_SIZE_S,
        fontWeight: 'normal'
    }
});