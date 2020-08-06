import React, { useState, useEffect, useRef } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native';
import { iosColors } from '../../util';

const ProgressButton = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    progressAnim.setValue(0);
    opacityAnim.setValue(1);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false
        }).start();
      }
    });
  }

  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })

  const colorInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"]
  })

  const progressStyle = {
    width: progressInterpolate,
    bottom: 0,
    backgroundColor: colorInterpolate,
    opacity: opacityAnim,
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[styles.button]}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </View>
          <Text style={[styles.buttonText]}>Got it!</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#e6537d",
    borderRadius: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#e6537d",
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    backgroundColor: 'transparent',
  },
  progressBar: {
    position: "absolute",
    top: 0, left: 0,

  }
})

export default ProgressButton;