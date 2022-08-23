/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Charts from './src/projects/Charts';
import Reanimated from './src/projects/Reanimated';
import ReanimatedGustureHandling from './src/projects/ReanimatedGustureHandling';
import SkiaHandsOn from './src/projects/SkiaHandsOn';
import SVGFirstTest from './src/projects/SVGFirstTest';
import ReanimatedScrollView from './src/projects/ReanimatedScrollView';
import ReanimatedRemoveOnSwipe from './src/projects/ReanimatedRemoveOnSwipe';
import ReanimatedCircularProgress from './src/projects/ReanimatedCircularProgress';
import ReanimatedRippleEffect from './src/projects/ReanimatedRippleEffect';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ProjectButton = ({ title, setActiveProject }) => {
  return (
    <TouchableOpacity
      onPress={setActiveProject}
      style={{
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 12,
      }}>
      <Text style={{ fontSize: 20, fontWeight: '300', color: 'black' }}>{title}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (<GestureHandlerRootView>
    <Projects />
  </GestureHandlerRootView>);
}

const Projects = () => {
  const [activeProject, setActiveProject] = useState(undefined);

  if (activeProject === undefined) {
    return (
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 20,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>Projects</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              paddingHorizontal: 10,
              paddingBottom: 200,
            }}>
            <ProjectButton
              title="🦾 SVG First Test"
              setActiveProject={() => {
                setActiveProject('SVGFirstTest');
              }}
            />
            <ProjectButton
              title="🎨 Skia"
              setActiveProject={() => {
                setActiveProject('SkaiHandsOn');
              }}
            />
            <ProjectButton
              title="📊 Charts"
              setActiveProject={() => {
                setActiveProject('Charts');
              }}
            />
            <ProjectButton
              title="🦎 React Native ReAnimated 2.0"
              setActiveProject={() => {
                setActiveProject('Reanimated');
              }}
            />
            <ProjectButton
              title="👆 Reanimated Gusture Handling"
              setActiveProject={() => {
                setActiveProject('ReanimatedGustureHandling');
              }}
            />
            <ProjectButton
              title="📜 Reanimated Scroll View"
              setActiveProject={() => {
                setActiveProject('ReanimatedScrollView');
              }}
            />
            <ProjectButton
              title="🗑 Reanimated Remove On Swipe"
              setActiveProject={() => {
                setActiveProject('ReanimatedRemoveOnSwipe');
              }}
            />
            <ProjectButton
              title="🔘 Reanimated Circular Progress"
              setActiveProject={() => {
                setActiveProject('ReanimatedCircularProgress');
              }}
            />
            <ProjectButton
              title="🔲 Reanimated Ripple Effect"
              setActiveProject={() => {
                setActiveProject('ReanimatedRippleEffect');
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (activeProject === 'SVGFirstTest') {
    return <SVGFirstTest />;
  }
  if (activeProject === 'SkaiHandsOn') {
    return <SkiaHandsOn />;
  }
  if (activeProject === 'Charts') {
    return <Charts />;
  }
  if (activeProject === 'Reanimated') {
    return <Reanimated />;
  }
  if (activeProject === 'ReanimatedGustureHandling') {
    return <ReanimatedGustureHandling />;
  }
  if (activeProject === 'ReanimatedScrollView') {
    return <ReanimatedScrollView />;
  }
  if (activeProject === 'ReanimatedRemoveOnSwipe') {
    return <ReanimatedRemoveOnSwipe />;
  }
  if (activeProject === 'ReanimatedCircularProgress') {
    return <ReanimatedCircularProgress />;
  }
  if (activeProject === 'ReanimatedRippleEffect') {
    return <ReanimatedRippleEffect />;
  }
};

export default App;
