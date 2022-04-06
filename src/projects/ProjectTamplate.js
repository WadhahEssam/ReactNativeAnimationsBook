import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import Svg, {Circle, Rect, StyleSheet} from 'react-native-svg';

const Project1 = () => {
  return (
    <SafeAreaView>
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Svg height="50%" width="50%" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
          />
          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
};

export default Project1;
