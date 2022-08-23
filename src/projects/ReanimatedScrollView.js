import React from 'react';
import {Dimensions, View} from 'react-native';
import {Text} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const WORDS = ['Whats', 'Up', 'Mobile', 'Devs'];

const ReanimatedScrollView = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(e => {
    translateX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{height: Dimensions.get('screen').height}}>
      {WORDS.map((word, index) => {
        return (
          <Page key={word} title={word} index={index} translateX={translateX} />
        );
      })}
    </Animated.ScrollView>
  );
};

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('screen');

const SquareSize = ScreenWidth * 0.65;

const Page = ({title, index, translateX}) => {
  const INPUT_RANGE = [
    (index - 1) * ScreenWidth,
    index * ScreenWidth,
    (index + 1) * ScreenWidth,
  ];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      INPUT_RANGE,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const rotate = interpolate(translateX.value, INPUT_RANGE, [90, 45, 0]);

    const borderRadius = interpolate(
      translateX.value,
      INPUT_RANGE,
      [200, 20, 200],
    );

    return {
      borderRadius,
      transform: [{scale}, {rotate: `${rotate}deg`}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, INPUT_RANGE, [-2, 1, -2]);
    const translateY = interpolate(translateX.value, INPUT_RANGE, [
      ScreenHeight / 2,
      0,
      -ScreenHeight / 2,
    ]);

    return {
      opacity,
      transform: [{translateY}]
    };
  });

  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: `rgba(0,0,256, 0.${index + 2})`,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={[
          {
            width: SquareSize,
            height: SquareSize,
            backgroundColor: 'rgba(0,0,256, 0.4)',
          },
          rStyle,
        ]}></Animated.View>
      <View
        style={{
          width: SquareSize,
          height: SquareSize,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={[
            {
              color: 'white',
              fontWeight: '900',
              fontSize: 50,
              textTransform: 'uppercase',
            },
            rTextStyle
          ]}>
          {WORDS[index]}
        </Animated.Text>
      </View>
    </View>
  );
};

export default ReanimatedScrollView;
