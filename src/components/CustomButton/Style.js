import {StyleSheet} from "react-native";
import color from '../../constants/Color';
import size from '../../constants/Size';

export default StyleSheet.create({
    buttonViewStyle: {
        height: size.BUTTON_HEIGHT,
        backgroundColor: color.BUTTON_COLOR,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }, buttonTextStyle: {
        color: color.BLACK,
        fontWeight: 'bold',
        fontSize: size.BUTTON_TEXT_SIZE
    }
})