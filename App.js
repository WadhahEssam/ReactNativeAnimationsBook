/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SVGFirstTest from './src/projects/SVGFirstTest';

const ProjectButton = ({title, setActiveProject}) => {
  return (
    <TouchableOpacity
      onPress={setActiveProject}
      style={{
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 12,
      }}>
      <Text style={{fontSize: 20, fontWeight: '300'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [activeProject, setActiveProject] = useState(undefined);

  if (activeProject === undefined) {
    return (
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>Projects</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              paddingHorizontal: 10,
            }}>
            <ProjectButton
              title="🦾 SVG First Test"
              setActiveProject={() => {
                setActiveProject('SVGFirstTest');
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
};

export default App;
