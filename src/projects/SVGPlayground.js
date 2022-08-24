import React from 'react'
import { Dimensions, SafeAreaView, ScrollView, Text } from 'react-native'
import { View } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated'
import Svg, { Circle, G, Path, Polygon, Rect } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SVGPlayground = () => {
  const svgHeight = 250;
  const svgWidth = Dimensions.get('screen').width;

  const circlePositionX = useSharedValue(svgWidth / 3);
  const circlePositionY = useSharedValue(svgHeight / 2);


  const fromCorrectY = (value) => {
    return svgHeight - value;
  }

  const getStepper = (values, width) => {
    return width / values.length;
  }

  const getPathFromValues = (values, width = 20) => {
    const stepper = getStepper(values, width);
    return [
      ...values.map((value, index) => {
        if (index === 0) {
          return `M ${0} ${fromCorrectY(value)}`;
        }
        return `L ${stepper * (index + 1)} ${fromCorrectY(value)}`
      })
    ].join(' ');
  }

  const getCurvedPathFromValues = (values) => {
    let dCurved = [];
    dCurved.push(`M ${0} ${svgHeight}`)
    for (let i = 0; i < values.length; i += 2) {
      if (values[i + 1]) {
        dCurved.push(`S ${(i + 1) * 20},${fromCorrectY(values[i])} ${((i + 2) * 20)},${fromCorrectY(values[i + 1])}`)
      } else {
        dCurved.push(`S ${(i + 1) * 20},${fromCorrectY(values[i])} ${(i + 1) * 20},${fromCorrectY(values[i])}`)
      }
    }
    dCurved = [...dCurved].join(' ')
    return dCurved;
  }

  const normalizeValuesBasedOnHeight = (values, height) => {
    const minimumValue = Math.min.apply(Math, [...values]);
    const normalizedLowest = values.map(value => {
      if (minimumValue < 0) {
        return value + (-minimumValue) + 20;
      }
      return value;
    })
    const maximumValue = Math.max.apply(Math, [...normalizedLowest]);
    const factor = (height - 20) / maximumValue;
    const normalizedHighest = normalizedLowest.map(value => value * factor)
    return normalizedHighest;
  }

  // const getCurvedPathFromValues = (values) => {
  //   let dCurved = [];
  //   dCurved.push(`M ${0} ${svgHeight}`)
  //   for (let i = 0; i < values.length; i += 2) {
  //     if (i == 0) {
  //       if (values[i + 1]) {
  //         dCurved.push(`C 0,${svgHeight} ${((i + 2) * 20) - 5},${fromCorrectY(values[i] + (values[i + 1] / 4))} ${(i + 2) * 20},${fromCorrectY(values[i])}`)
  //       }
  //     } else {
  //       if (values[i + 1]) {
  //         // dCurved.push(`C 0,${svgHeight} ${((i + 2) * 20) - 5},${fromCorrectY(values[i] + (values[i + 1] / 4))} ${(i + 2) * 20},${fromCorrectY(values[i])}`)
  //       }
  //     }
  //     dCurved = [...dCurved].join(' ')
  //     return dCurved;
  //   }
  // }

  const values = [0, 20, 30, 20, 30, 30, 100, 20, 100, 1000, 200, 300, 650, 333, ];



  const circlePositionXProp = useAnimatedProps(() => {
    return {
      cx: circlePositionX.value,
      cy: circlePositionY.value
    }
  })

  return (
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        <View style={{ backgroundColor: 'grey' }}>
          <Svg width={svgWidth} height={svgHeight}>
            <Path d={getPathFromValues(normalizeValuesBasedOnHeight(values, svgHeight), svgWidth)} stroke="pink" strokeWidth={3} />
          </Svg>
        </View>
        <View style={{ backgroundColor: 'pink' }}>
          <Svg width={svgWidth} height={svgHeight}>
            <Path d={getCurvedPathFromValues(values)} stroke="grey" strokeWidth={3} />
          </Svg>
        </View>

        <View style={{ backgroundColor: 'grey' }}>
          <Svg width={svgWidth} height={svgHeight}>
            <AnimatedCircle
              onPress={(e) => {
                if (circlePositionX.value === svgWidth / 3) {
                  circlePositionX.value = withSpring((svgWidth / 3 * 2))
                } else {
                  circlePositionX.value = withSpring((svgWidth / 3))
                }
              }}
              animatedProps={circlePositionXProp}
              r={svgHeight > svgWidth ? svgWidth / 4 : svgHeight / 4}
              fill="pink"
            />
          </Svg>
        </View>

        <View style={{ backgroundColor: 'pink' }}>
          <Svg width={svgWidth} height={svgHeight}>
            <G x={0} scaleX={2} originX={svgWidth / 2}>
              <Path d={`M ${svgWidth / 2} ${svgHeight / 2 - 5} H ${svgWidth / 3} V ${svgHeight / 3} H ${svgWidth / 3 * 2} V ${svgHeight / 3 * 2} H ${svgWidth / 3} V ${svgHeight / 2 + 5} H ${svgWidth / 2} V ${svgHeight / 2 - 5}`} fill="grey" />
            </G>
          </Svg>
        </View>
        <View style={{ backgroundColor: 'grey' }}>
          <Svg width={svgWidth} height={svgHeight}>
            <Path d={`M ${svgWidth / 2} ${svgHeight / 2 - 5} H ${svgWidth / 3} V ${svgHeight / 3} H ${svgWidth / 3 * 2} V ${svgHeight / 3 * 2} H ${svgWidth / 3} V ${svgHeight / 2 + 5} H ${svgWidth / 2} V ${svgHeight / 2 - 5}`} stroke="pink" />
          </Svg>
        </View>
        <View style={{ backgroundColor: 'pink' }}>
          <Svg width={svgWidth} height={svgHeight}>
            <Path d={`M ${svgWidth / 2} ${svgHeight / 2} l 0,50 s 0,20 -20,20 h -100 s -20, 0 -20,-20 v -50 s 0,-20 20,-20 h 10 s 20,0 20,20  v 20 s 0,20 20,20 h 0 s 20,0 20,-20 v -20 s 0,-20 20,-20 h 10 s 20,0 20,20 `} stroke="grey" />
          </Svg>
        </View>
      </ScrollView >
    </SafeAreaView>
  )
}

export default SVGPlayground