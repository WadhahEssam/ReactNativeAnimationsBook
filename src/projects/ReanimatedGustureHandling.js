import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const SIZE = 70;
const CIRCLE_RADIUS = 160;

const ReanimatedGustureHandling = () => {
  const translateX = useSharedValue(0);
  const transalteY = useSharedValue(0);
  const scale = useSharedValue(1);
  const [isOutsideCircle, setIsOutsideCircle] = useState(false);

  const test = useDerivedValue(() => {
    return withTiming(scale.value > 1 ? 1 : 0, {duration: 300});
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e, context) => {
      context.translateX = translateX.value;
      context.transalteY = transalteY.value;
      // console.log(`onStart: tX: ${e.translationX}, ctX: ${context.translateX}, tY: ${e.translationY}, ctY: ${context.transalteY}`);
    },
    onActive: (e, context) => {
      translateX.value = e.translationX + context.translateX;
      transalteY.value = e.translationY + context.transalteY;
      if (
        Math.sqrt(
          transalteY.value * transalteY.value +
            translateX.value * translateX.value,
        ) -
          SIZE / 2 >
        CIRCLE_RADIUS
      ) {
        scale.value = withSpring(1.3);
      } else {
        scale.value = withSpring(1);
      }
      // console.log(`onActive: tX: ${e.translationX}, ctX: ${context.translateX}, tY: ${e.translationY}, ctY: ${context.transalteY}`);
    },
    onEnd: e => {
      // console.log(
      //   `onEnd: tX: ${e.translationX}, tY: ${e.translationY}, borderRadius: ${CIRCLE_RADIUS}, atX: ${e.absoluteX}`,
      // );
      if (
        Math.sqrt(
          transalteY.value * transalteY.value +
            translateX.value * translateX.value,
        ) -
          SIZE / 2 <
        CIRCLE_RADIUS
      ) {
        translateX.value = withSpring(0);
        transalteY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      test.value,
      [0, 1],
      ['pink', 'gray'],
    );

    return {
      transform: [
        {translateX: translateX.value},
        {translateY: transalteY.value},
        {scale: scale.value},
      ],
      backgroundColor,
    };
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: CIRCLE_RADIUS * 2,
            height: CIRCLE_RADIUS * 2,
            borderRadius: CIRCLE_RADIUS,
            borderWidth: 3,
            borderColor: 'pink',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View
              style={[
                {
                  width: SIZE,
                  height: SIZE,
                  backgroundColor: 'pink',
                  borderRadius: 20,
                },
                rStyle,
              ]}>
              {/* <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>RESET</Text>
                </TouchableOpacity> */}
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReanimatedGustureHandling;
