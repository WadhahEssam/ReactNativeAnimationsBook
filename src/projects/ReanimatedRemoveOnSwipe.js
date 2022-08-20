import React, {useCallback, useState} from 'react';
import {useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PanGestureHandler, ScrollView} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const TITLES = [
  'This is the first task',
  'And here is the second task',
  'Here is the the third one',
  'Forth Task is here',
  'This is the first task',
  'And here is the second task',
  'Here is the the third one',
  'Forth Task is here',
  'This is the first task',
  'And here is the second task',
  'Here is the the third one',
  'Forth Task is here',
];

const TASKS = TITLES.map((title, index) => {
  return {
    title,
    index,
  };
});

const ReanimatedRemoveOnSwipe = () => {
  const [tasks, setTasks] = useState(TASKS);

  const scrollRef = useRef(null);

  const onDismiss = useCallback(task => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  console.log({tasks});

  return (
    <SafeAreaView>
      <Text style={{fontSize: 60, marginStart: 10, marginBottom: 20}}>
        Tasks
      </Text>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 100
        }}>
        {tasks.map(task => {
          return (
            <TaskItem
              key={task.index}
              task={task}
              onDismiss={onDismiss}
              simultaneousHandlers={scrollRef}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const TaskItem = ({task, onDismiss, simultaneousHandlers}) => {
  const translateX = useSharedValue(0);
  const scaleY = useSharedValue(1);
  const buttonOpacity = useSharedValue(0);
  const itemHeight = useSharedValue(60);
  const marginBottom = useSharedValue(10);

  const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('screen');

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.translateX = translateX.value;
    },
    onActive: (e, ctx) => {
      translateX.value = e.translationX + ctx.translateX;
      if (translateX.value < -95) {
        buttonOpacity.value = withTiming(1, {duration: 200});
      } else {
        buttonOpacity.value = withTiming(0, {duration: 200});
      }
    },
    onEnd: (e, ctx) => {
      if (translateX.value < -95) {
        buttonOpacity.value = withTiming(1, {duration: 200});
      } else {
        buttonOpacity.value = withTiming(0, {duration: 200});
      }

      if (translateX.value > -95) {
        translateX.value = withSpring(0);
      } else if (translateX.value < -182) {
        translateX.value = withTiming(-ScreenWidth, {duration: 200});
        scaleY.value = withTiming(0, {duration: 200}, isFinished => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
        itemHeight.value = withTiming(0, {duration: 200});
        buttonOpacity.value = withTiming(0, {duration: 100});
        marginBottom.value = withTiming(0, {duration: 200});
      } else {
        translateX.value = withSpring(-95);
        ctx.translateX = -95;
      }
    },
  });

  const taskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, -ScreenWidth], [1, 0]);

    return {
      transform: [{translateX: translateX.value}, {scaleY: scaleY.value}],
      opacity,
      height: itemHeight.value,
      marginVertical: marginBottom.value,
    };
  }, []);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      height: itemHeight.value,
    };
  }, []);

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            width: '90%',
            position: 'absolute',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingEnd: 20,
            bottom: 10,
          },
          buttonStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            if (onDismiss) {
              onDismiss(task);
            }
          }}>
          <Text style={{color: 'red', fontWeight: '900'}}>REMOVE</Text>
        </TouchableOpacity>
      </Animated.View>

      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            {
              width: '90%',
              backgroundColor: 'white',
              shadowOpacity: 0.1,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 5,
              borderRadius: 15,
              justifyContent: 'center',
              paddingStart: 20,
            },
            taskStyle,
          ]}>
          <Text>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ReanimatedRemoveOnSwipe;
