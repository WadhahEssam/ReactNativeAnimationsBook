/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View, ScrollView, Dimensions} from 'react-native';
import Svg, {Circle, Rect, SvgCssUri, SvgUri, SvgXml} from 'react-native-svg';

const SVGFirstTest = () => {
  const xml = `
  <svg width="32" height="32" viewBox="0 0 32 32">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      fill="url(#gradient)"
      d="M4 0C1.79086 0 0 1.79086 0 4V28C0 30.2091 1.79086 32 4 32H28C30.2091 32 32 30.2091 32 28V4C32 1.79086 30.2091 0 28 0H4ZM17 6C17 5.44772 17.4477 5 18 5H20C20.5523 5 21 5.44772 21 6V25C21 25.5523 20.5523 26 20 26H18C17.4477 26 17 25.5523 17 25V6ZM12 11C11.4477 11 11 11.4477 11 12V25C11 25.5523 11.4477 26 12 26H14C14.5523 26 15 25.5523 15 25V12C15 11.4477 14.5523 11 14 11H12ZM6 18C5.44772 18 5 18.4477 5 19V25C5 25.5523 5.44772 26 6 26H8C8.55228 26 9 25.5523 9 25V19C9 18.4477 8.55228 18 8 18H6ZM24 14C23.4477 14 23 14.4477 23 15V25C23 25.5523 23.4477 26 24 26H26C26.5523 26 27 25.5523 27 25V15C27 14.4477 26.5523 14 26 14H24Z"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="8.46631"
        y2="37.3364"
        gradient-units="userSpaceOnUse">
        <stop offset="0" stop-color="#FEA267" />
        <stop offset="1" stop-color="#E75A4C" />
      </linearGradient>
    </defs>
  </svg>
`;

  const xml2 = `
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="120" stroke="red" />
        <line x1="65" y1="65" x2="235" y2="235" style="stroke:rgb(255,0,0);stroke-width:1" stroke="green" />
        <line x1="65" y1="65" x2="235" y2="235" style="stroke:rgb(255,0,0);stroke-width:1" stroke="green" transform="rotate(90 150 150)" />
        <rect x="100" y="100" width="100" height="100" rx="15" stroke="blue" />
        <ellipse cx="50%" cy="50%" rx="100" ry="20" stroke="orange" transform="rotate(-45 150 150)" />
        <ellipse cx="50%" cy="50%" rx="100" ry="20" stroke="orange" transform="rotate(45 150 150)" />
        <ellipse cx="50%" cy="50%" rx="100" ry="20" stroke="orange" transform="rotate(0 150 150)" />
        <ellipse cx="50%" cy="50%" rx="100" ry="20" stroke="orange" transform="rotate(90 150 150)" />
        <polygon points="65,65 30,150 65,235 150,270 235,235 270,150 235,65 150,30" style="stroke-width:1" stroke="purple" />

        <polyline points="65,65 0, 0" style="fill:none;stroke:black;stroke-width:1" />
        <polyline points="235,235 300, 300" style="fill:none;stroke:black;stroke-width:1" />
        <polyline points="235,65 300, 0" style="fill:none;stroke:black;stroke-width:1" />
        <polyline points="235,65 0, 300" style="fill:none;stroke:black;stroke-width:1" />
    </svg>
`;

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 100,
            },
          ]}>
          <SvgXml
            scale={1}
            xml={xml2}
            width="100%"
            height={Dimensions.get('screen').width}
          />
        </View>

        <View
          style={[
            {alignItems: 'center', justifyContent: 'center', marginBottom: 100},
          ]}>
          <SvgXml xml={xml} width="300" height="300" />
        </View>

        <View style={[{alignItems: 'center', justifyContent: 'center'}]}>
          <Svg height="300" width="300" viewBox="0 0 100 100">
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

        <View
          style={[
            {alignItems: 'center', justifyContent: 'center', marginTop: 100},
          ]}>
          <SvgUri
            width="300"
            height="300"
            uri="https://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
          />
        </View>

        <View
          style={[
            {alignItems: 'center', justifyContent: 'center', marginTop: 100},
          ]}>
          <SvgCssUri
            width="300"
            height="300"
            uri="https://thenewcode.com/assets/svg/accessibility.svg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SVGFirstTest;
