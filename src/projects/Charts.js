import React from 'react';
import {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

const Charts = () => {
  const data = [
    {value: 20},
    {value: 30},
    {value: 26},
    {value: 40},
    {value: 40},
    {value: 40},
    {value: 40},
    {value: 40},
  ];

  const dPoint = () => {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: 'red',
          borderWidth: 3,
          borderRadius: 7,
          borderColor: '#07BAD1',
        }}
      />
    );
  };

  const latestData = [
    {
      value: 100,
      labelComponent: () => <Text>28 Nov</Text>,
      customDataPoint: dPoint,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 210,
      customDataPoint: dPoint,
    },
    {
      value: 250,
      hideDataPoint: true,
    },
    {
      value: 320,
      labelComponent: () => <Text>28 Nov</Text>,
      customDataPoint: dPoint,
    },
    {
      value: 310,
      hideDataPoint: true,
    },
    {
      value: 270,
      customDataPoint: dPoint,
    },
    {
      value: 240,
      hideDataPoint: true,
    },
    {
      value: 130,
      labelComponent: () => <Text>28 Nov</Text>,
      customDataPoint: dPoint,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
    {
      value: 210,
      hideDataPoint: true,
    },
    {
      value: 270,
      labelComponent: () => <Text>28 Nov</Text>,
      customDataPoint: dPoint,
    },
    {
      value: 240,
      hideDataPoint: true,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
    {
      value: 210,
      labelComponent: () => <Text>28 Nov</Text>,
      customDataPoint: dPoint,
    },
    {
      value: 20,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
  ];
  const [currentData, setCurrentData] = useState(latestData);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{}}>
          <LineChart
            data={data}
            color={'red'}
            dataPointsColor1={'green'}
            hideDataPoints1
            hideRules
            initialSpacing={0}
            hideOrigin
            hideYAxisText
            hideAxesAndRules
            showVerticalLines
            width={Dimensions.get('screen').width - 60}
            spacing={50}
            thickness={3}
          />
        </View>

        <View>
          <View>
            <View
              style={{
                marginVertical: 100,
                paddingVertical: 50,
                backgroundColor: '#414141',
              }}>
              <LineChart
                isAnimated
                thickness={3}
                color="#07BAD1"
                maxValue={600}
                noOfSections={3}
                animateOnDataChange
                animationDuration={1000}
                onDataChangeAnimationDuration={300}
                areaChart
                yAxisTextStyle={{color: 'lightgray'}}
                data={currentData}
                hideDataPoints
                focusedDataPointColor={'red'}
                focusedDataPointShape={'red'}
                startFillColor={'rgb(84,219,234)'}
                endFillColor={'rgb(84,219,234)'}
                startOpacity={0.4}
                endOpacity={0.1}
                spacing={22}
                backgroundColor="#414141"
                rulesColor="gray"
                rulesType="solid"
                initialSpacing={10}
                yAxisColor="lightgray"
                xAxisColor="lightgray"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Charts;
