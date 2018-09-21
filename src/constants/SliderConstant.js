import { Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(50);
const itemHorizontalMargin = wp(3);

export const slideHeight = viewportHeight * 0.36;
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const horizontalMargin = itemHorizontalMargin;
export const entryBorderRadius = 8;