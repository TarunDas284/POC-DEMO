import {StyleSheet} from 'react-native';
import color from '../../constants/Color';
import size from '../../constants/Size';
import {
    itemWidth,
    sliderWidth,
    horizontalMargin,
    slideHeight,
    entryBorderRadius
} from '../../constants/SliderConstant'

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: horizontalMargin,
        paddingBottom: 18
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: horizontalMargin,
        right: horizontalMargin,
        bottom: 18,
        shadowColor: color.LIGHT_BLACK,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: -1,
        backgroundColor: color.LIGHT_BLACK,
        borderRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: color.WHITE
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: entryBorderRadius,
    },
    rotateViewRight: {
        transform: [{ rotate: '-5deg'}],
        marginTop: 10,
        marginBottom: 10
    },rotateViewLeft: {
        transform: [{ rotate: '5deg'}],
        marginTop: 10,
        marginBottom: 10
    }
});
