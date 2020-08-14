import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';
import Heart from '../Components/Heart';

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
});

export default BouncingHeart;