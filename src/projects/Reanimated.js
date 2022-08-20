import React, {useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
  Easing,
} from 'react-native-reanimated';

const Reanimated = () => {
  // useSahredValue gives us a value that can be handled by the ui thread.
  const progress = useSharedValue(0);
  const scale = useSharedValue(2);

  // returns a style that is similar to the react native style
  // bu used for reanimated objects
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{scale: scale.value}]
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: 1000, easing: Easing.linear}),
      -1,
      true,
    );

    // with spring is based on physics
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get('screen').height - 100,
        }}>
        <Animated.View
          style={[
            {
              height: 100,
              width: 100,
              backgroundColor: 'pink',
              borderRadius: 10
            },
            reanimatedStyle,
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default Reanimated;
