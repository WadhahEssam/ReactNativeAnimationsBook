import React, {useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleLength = 900;
const CircleR = CircleLength / (2 * Math.PI);

const ReanimatedCircularProgress = () => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');
  const progress = useSharedValue(0);
  const direcation = useSharedValue('down');
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#054');

  const animatedPropsCircle = useAnimatedProps(() => {
    return {
      strokeDashoffset: (1 - progress.value) * CircleLength,
    };
  });

  const progressText = useDerivedValue(() => {
    return `%${Math.floor(progress.value * 100)}`;
  });

  const buttonText = useDerivedValue(() => {
    if (progress.value === 0) {
      return 'START';
    }
    return 'RESET';
  });

  const resetAnimation = () => {
    if (direcation.value === 'down') {
      progress.value = withTiming(1, {duration: 2000 / selectedSpeed});
      direcation.value = 'up';
    } else {
      progress.value = withTiming(0, {duration: 2000 / selectedSpeed});
      direcation.value = 'down';
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: selectedColor,
      }}>
      <ReText
        style={{
          fontSize: 50,
          fontWeight: '900',
          color: 'white',
          position: 'absolute',
        }}
        text={progressText}
      />
      <Svg>
        <Circle
          cx={SCREEN_WIDTH / 2}
          cy={SCREEN_HEIGHT / 2}
          r={CircleR}
          stroke={pSBC(-0.5, selectedColor)}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={SCREEN_WIDTH / 2}
          cy={SCREEN_HEIGHT / 2}
          r={CircleR}
          stroke={pSBC(0.1, selectedColor, 'c', true)}
          strokeWidth={18}
          strokeDasharray={CircleLength}
          strokeLinecap={'round'}
          animatedProps={animatedPropsCircle}
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 40,
        }}>
        <TouchableOpacity
          onPress={resetAnimation}
          style={{
            backgroundColor: pSBC(-0.3, selectedColor, 'c', true),
            paddingHorizontal: 50,
            paddingVertical: 20,
            borderRadius: 40,
            marginBottom: 10
          }}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: '900'}}>
            ANIMATE
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <SpeedButton
            speed={1}
            selectedSpeed={selectedSpeed}
            setSelectedSpeed={setSelectedSpeed}
            selectedColor={pSBC(-0.3, selectedColor, 'c', true)}
            notSelectedColor={pSBC(0.6, selectedColor, 'c', true)}
          />
          <SpeedButton
            speed={2}
            selectedSpeed={selectedSpeed}
            setSelectedSpeed={setSelectedSpeed}
            selectedColor={pSBC(-0.3, selectedColor, 'c', true)}
            notSelectedColor={pSBC(0.6, selectedColor, 'c', true)}
          />
          <SpeedButton
            speed={3}
            selectedSpeed={selectedSpeed}
            setSelectedSpeed={setSelectedSpeed}
            selectedColor={pSBC(-0.3, selectedColor, 'c', true)}
            notSelectedColor={pSBC(0.6, selectedColor, 'c', true)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <ColorButton
            color={'#054'}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <ColorButton
            color={'#326280'}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <ColorButton
            color={'#593070'}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <ColorButton
            color={'#4B2F23'}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </View>
      </View>
    </View>
  );
};

const ColorButton = ({color, selectedColor, setSelectedColor}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedColor(color);
      }}
      style={{
        backgroundColor: selectedColor === color ? 'white' : color,
        height: 30,
        width: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
      }}>
      <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: color,
          borderRadius: 20,
        }}
      />
    </TouchableOpacity>
  );
};

const SpeedButton = ({speed, setSelectedSpeed, selectedSpeed, selectedColor, notSelectedColor}) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedSpeed(speed)}
      style={{
        backgroundColor: selectedSpeed === speed ? selectedColor : notSelectedColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 120,
        marginHorizontal: 5,
      }}>
      <Text
        style={{
          fontWeight: '900',
          color: selectedSpeed === speed ? 'white' : 'black',
        }}>
        {`${speed}x`}
      </Text>
    </TouchableOpacity>
  );
};

export default ReanimatedCircularProgress;

const pSBC = (p, c0, c1, l) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    i = parseInt,
    m = Math.round,
    a = typeof c1 == 'string';
  if (
    typeof p != 'number' ||
    p < -1 ||
    p > 1 ||
    typeof c0 != 'string' ||
    (c0[0] != 'r' && c0[0] != '#') ||
    (c1 && !a)
  )
    return null;
  if (!this.pSBCr)
    this.pSBCr = d => {
      let n = d.length,
        x = {};
      if (n > 9) {
        ([r, g, b, a] = d = d.split(',')), (n = d.length);
        if (n < 3 || n > 4) return null;
        (x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))),
          (x.g = i(g)),
          (x.b = i(b)),
          (x.a = a ? parseFloat(a) : -1);
      } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6)
          d =
            '#' +
            d[1] +
            d[1] +
            d[2] +
            d[2] +
            d[3] +
            d[3] +
            (n > 4 ? d[4] + d[4] : '');
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5)
          (x.r = (d >> 24) & 255),
            (x.g = (d >> 16) & 255),
            (x.b = (d >> 8) & 255),
            (x.a = m((d & 255) / 0.255) / 1000);
        else
          (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
      }
      return x;
    };
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
    (f = this.pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != 'c'
        ? this.pSBCr(c1)
        : P
        ? {r: 0, g: 0, b: 0, a: -1}
        : {r: 255, g: 255, b: 255, a: -1}),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) return null;
  if (l)
    (r = m(P * f.r + p * t.r)),
      (g = m(P * f.g + p * t.g)),
      (b = m(P * f.b + p * t.b));
  else
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      'rgb' +
      (f ? 'a(' : '(') +
      r +
      ',' +
      g +
      ',' +
      b +
      (f ? ',' + m(a * 1000) / 1000 : '') +
      ')'
    );
  else
    return (
      '#' +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};
