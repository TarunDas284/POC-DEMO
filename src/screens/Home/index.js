import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView, Platform
} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';
import AppText from '../../constants/AppText'
import CustomButton from '../../components/CustomButton/CustomButton';
import {NEXT_PAGE} from '../../constants/NavigationActionConstant';
import color from '../../constants/Color';
import size from '../../constants/Size';
import {SLIDER_DATA} from '../../constants/HomepageData';
import {sliderWidth, itemWidth} from '../../constants/SliderConstant';
import SlideItem from '../../components/SliderItem'
import Carousel from 'react-native-snap-carousel';

const SLIDER_FIRST_ITEM = 1;

let activeSlide = SLIDER_FIRST_ITEM;

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlideState: SLIDER_FIRST_ITEM
        };
    }


    renderItem ({item, index}, parallaxProps) {
        return (
            <SlideItem
                data={item}
                index={index}
                totalSize={SLIDER_DATA.length}
                activeSlide = {activeSlide}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    render() {
        return (
            <View style={styles.rootViewDesign}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.innerRootStyle}>
                        <View style={styles.headerRootStyle}>
                            <View style={styles.headerRoundViewStyle}>
                                <Text style={styles.headerTextStyle}>{AppText.HOME}</Text>
                            </View>
                        </View>

                        <View style={styles.sliderContainer}>
                            <Carousel
                                ref={c => this._sliderRef = c}
                                data={SLIDER_DATA}
                                renderItem={this.renderItem}
                                sliderWidth={sliderWidth}
                                itemWidth={itemWidth}
                                hasParallaxImages={true}
                                firstItem={SLIDER_FIRST_ITEM}
                                inactiveSlideScale={0.8}
                                inactiveSlideOpacity={0.5}
                                containerCustomStyle={styles.slider}
                                contentContainerCustomStyle={styles.sliderContentContainer}
                                loop={false}
                                loopClonesPerSide={2}
                                autoplay={false}
                                autoplayDelay={500}
                                autoplayInterval={3000}
                                onSnapToItem={(index) => {
                                    activeSlide = index;
                                    this.setState({activeSlideState: index})
                                }}/>
                        </View>
                    </View>
                </ScrollView>
                <CustomButton pressButton={this.gotoLocationPage.bind(this)}
                              title={AppText.SHOW_MY_LOCATION_BUTTON_TEXT}/>
            </View>
        );
    }

    gotoLocationPage() {
        this.props.goToNextPage('LocationScreen');
    }
}

function mapStateToProps(state) {
    return {
        nav: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToNextPage: (page) => dispatch({type: NEXT_PAGE, nextPage: page})
    }
}

HomeScreen.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
