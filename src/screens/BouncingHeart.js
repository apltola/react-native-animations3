import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';
import { iosColors } from '../../util';
import Heart from '../Components/Heart';

/* const Heart = ({ filled, style, ...props }) => {
  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeaft, styles.heartShape, styles.emptyFill]} />
      <View style={[styles.rightHeaft, styles.heartShape, styles.emptyFill]} />
    </View>
  )

  const fillStyle = filled ? styles.filledHeart : styles.empty

  return (
    <Animated.View {...props} style={[styles.heart, style]}>
      <View style={[styles.leftHeaft, styles.heartShape, fillStyle]} />
      <View style={[styles.rightHeaft, styles.heartShape, fillStyle]} />
      {!filled && centerNonFilled}
    </Animated.View>
  )
} */

const BouncingHeart = () => {
  const [liked, setLiked] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [animations, setAnimations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]);

  const toggleLike = () => {
    setLiked(prev => !prev);
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: false
    }).start(() => {
      scaleAnimation.setValue(0);
    });
  }

  const bounceInterpolate = scaleAnimation.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [1, .8, 1]
  })

  const heartButtonStyle = {
    transform: [
      { scale: bounceInterpolate }
    ]
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleLike}>
        <Animated.View style={[heartButtonStyle]}>
          <Heart filled={liked} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  filledHeart: {
    backgroundColor: "#e31745",
  },
  fit: {
    transform: [
      { scale: .9 }
    ]
  },
  emptyFill: {
    backgroundColor: "#FFF",
  },
  empty: {
    backgroundColor: "#ccc",
  },
  leftHeaft: {
    transform: [
      { rotate: "-45deg" }
    ],
    left: 5,
    backgroundColor: "#000"
  },
  rightHeaft: {
    transform: [
      { rotate: "45deg" }
    ],
    right: 5,
    backgroundColor: "#000"
  },
});

export default BouncingHeart;