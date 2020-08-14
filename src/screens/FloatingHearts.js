import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';
import { iosColors } from '../../util';

const { width, height } = Dimensions.get("window");
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  const handleAddHeart = () => {
    const animation = new Animated.Value(0);
    setHearts(prev => {
      return [...prev, {
        animation,
        start: getRandomInt(100, width - 100)
      }]
    })
  }

  useEffect(() => {
    if (hearts.length > 0) {

      Animated.timing(hearts[hearts.length-1].animation, {
        toValue: height,
        duration: 3000,
        useNativeDriver: false
      }).start();
    }
  }, [hearts])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleAddHeart}>

        <View style={[StyleSheet.absoluteFill]}>
          {
            hearts.map(({ animation, start }, index) => {
              const positionInterpolate = animation.interpolate({
                inputRange: [0, height],
                outputRange: [height - 50, 0]
              })
              const opacityInterpolate = animation.interpolate({
                inputRange: [0, height-200],
                outputRange: [1, 0]
              })
              const scaleInterpolate = animation.interpolate({
                inputRange: [0, 15, 30],
                outputRange: [0, 1.2, 1],
                extrapolate: "clamp"
              })

              const dividedHeight = height / 6;
              const wobbleInterpolate = animation.interpolate({
                inputRange: [
                  0,
                  dividedHeight * 1,
                  dividedHeight * 2,
                  dividedHeight * 3,
                  dividedHeight * 4,
                  dividedHeight * 5,
                  dividedHeight * 6
                ],
                outputRange: [
                  0,
                  15,
                  -15,
                  15,
                  -15,
                  15,
                  -15
                ],
                extrapolate: "clamp"
              })

              const heartStyle = {
                left: start,
                transform: [
                  { translateY: positionInterpolate },
                  { translateX: wobbleInterpolate },
                  { scale: scaleInterpolate }
                ],
                opacity: opacityInterpolate
              }

              return <Heart key={index} style={heartStyle} />
            })
          }
          <Text style={styles.tap}>
            tap
          </Text>
        </View>
      </TouchableWithoutFeedback>  
    </View>
  )
}

const Heart = ({ style }) => {
  return (
    <Animated.View style={[styles.heart, style]}>
      <View style={[styles.heartShape, styles.leftHeart]} />
      <View style={[styles.heartShape, styles.rightHeart]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heart: {
    width: 50,
    height: 50,
    position: "absolute"
  },
  heartShape: {
    width: 30,
    height: 45,
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fc3d39"
  },
  leftHeart: {
    transform: [{rotate: "-45deg"}],
    left: 5
  },
  rightHeart: {
    transform: [{rotate: "45deg"}],
    right: 5
  },
  tap: {
    marginTop: height/2,
    width,
    textAlign: "center",
    color: "rgba(0,0,0,.4)",
    fontWeight: "bold",
    fontSize: 18,
  }
})

export default FloatingHearts;