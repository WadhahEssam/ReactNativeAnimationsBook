import React from 'react';
import {Text, View} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedRippleEffect = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Ripple style={{ height: 150, width: 300}}>
        <Text
          style={{
            color: 'purple',
            letterSpacing: 5,
            fontWeight: '500',
            fontSize: 25,
          }}>
          HELP
        </Text>
      </Ripple>
    </View>
  );
};
const ANIMATION_DURATION = 450;

const Ripple = ({style, onTap, children}) => {
  const rippleRadius = useSharedValue(0);
  const rippleOpacity = useSharedValue(0.7);
  const ripplePositionX = useSharedValue(0);
  const ripplePositionY = useSharedValue(0);
  const width = style?.width || 200;
  const height = style?.height || 200;

  const aRef = useAnimatedRef();

  const onAnimationFinish = () => {
    'worklet';
    rippleRadius.value = 0;
    rippleOpacity.value = 0.7;
  };

  const calculateRectDiagonal = (height, width) => {
    'worklet'
    return ((height ** 2 + width ** 2) ** (1/2)) * 2;
  }

  const startRippling = ({e}) => {
    'worklet';
    const layout = measure(aRef);
    ripplePositionX.value = e.x;
    ripplePositionY.value = e.y;
    rippleRadius.value = withTiming(calculateRectDiagonal(height, width), {
      duration: ANIMATION_DURATION,
    });
  }

  const endRippling = () => {
    'worklet';
    const layout = measure(aRef);
    if (rippleOpacity.value > 0.3) {
      rippleRadius.value = withTiming(calculateRectDiagonal(height, width), {
        duration: ANIMATION_DURATION,
      }, (finished) => {
        if (finished) {
          rippleOpacity.value = withTiming(0, {duration: 200}, finished => {
            if (finished) {
              onAnimationFinish();
            }
          });
        }
      });
    } else {
      rippleOpacity.value = withTiming(0, {duration: 200}, finished => {
        if (finished) {
          onAnimationFinish();
        }
      });
    }
  }

  const singleTap = Gesture.Tap()
    .onBegin(e => {
      startRippling({e});
    })
    .maxDuration(10000)
    .onTouchesCancelled(() => {
      // endRippling();
    })
    .onFinalize(() => {
      endRippling();
    })
    .onEnd(e => {
      endRippling();
    });

  const rippleStyle = useAnimatedStyle(() => {
    return {
      height: rippleRadius.value,
      width: rippleRadius.value,
      borderRadius: rippleRadius.value,
      opacity: rippleOpacity.value,
      left: ripplePositionX.value - rippleRadius.value / 2,
      top: ripplePositionY.value - rippleRadius.value / 2,
    };
  });

  return (
    <View
      style={{
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 20,
        shadowColor: 'rgba(0,0,0, 0.1)',
      }}
      ref={aRef}>
      <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
        <View
          style={{
            height,
            width,
            backgroundColor: 'pink',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            ...style,
          }}>
          {children}
          <Animated.View
            style={[
              rippleStyle,
              {
                backgroundColor: 'purple',
                position: 'absolute',
              },
            ]}
          />
        </View>
      </GestureDetector>
    </View>
  );
};

export default ReanimatedRippleEffect;
