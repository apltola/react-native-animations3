import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { iosColors } from '../../util';

const Joku = () => {
  const [contentIsExpanded, setContentIsExpanded] = useState(false);
  const sizeAnimation = useRef(new Animated.Value(0)).current;
  const panAnimation = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      /* onPanResponderMove: Animated.event([
        null,
        {
          dx: panAnimation.x,
          dy: panAnimation.y
        }
      ]), */
      onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
        let velocity;
      }
    })
  ).current;

  useEffect(() => {
    return () => {
      sizeAnimation.setValue(0);
    }
  }, [])

  const jokuInterpolate = sizeAnimation.interpolate({
    inputRange: [0,1],
    outputRange: ["10%", "90%"],
    //extrapolate: "clamp"
  });

  const animatedStyles = {
    height: jokuInterpolate
  }

  const onContentExpand = () => {
    Animated.spring(sizeAnimation, {
      toValue: 1,
      bounciness: 10,
      useNativeDriver: false
    }).start(() => {
      setContentIsExpanded(true);
    });
  }

  const panHandlers = contentIsExpanded ? panResponder.panHandlers : {};

  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill, styles.absoluteContainer]}>
        <TouchableWithoutFeedback onPress={onContentExpand}>
          <Animated.View style={[styles.content, animatedStyles]}>
            <Text style={{color: "#feffea", fontSize: 20, fontWeight: 'bold'}}>jeejeejee</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteContainer: {
    justifyContent: 'flex-end',
  },
  content: {
    //borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    //height: "50%",
    backgroundColor: "#424242",
  }
});

export default Joku;