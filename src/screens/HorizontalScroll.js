import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';
import Slide from '../Components/DrinkSlide';

const Images = [
  { image: require('../../assets/drinkImages/drink1.jpg'), title: "Vodka Cran" },
  { image: require('../../assets/drinkImages/drink2.jpg'), title: "Old Fashioned" },
  { image: require('../../assets/drinkImages/drink3.jpg'), title: "Mule" },
  { image: require('../../assets/drinkImages/drink4.jpg'), title: "Strawberry Daiquiri" },
  { image: require('../../assets/drinkImages/drink6.jpeg'), title: "Martini" },
];

const { width, height } = Dimensions.get("window");

const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    (i - 1) * width,
    i * width,
    (i + 1) * width
  ]
  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];
  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp"
  })
}

const getSeparator = i => {
  return (
    <View
      key={i}
      style={[styles.separate, { left: (i - 1) * width - 2.5 }]}
    />
  );
}

const Drinks = () => {
  const animatedScroll = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animatedScroll
                }
              }
            }
          ],
          { useNativeDriver: false }
        )}
      >
        {Images.map((image, i) => {
          return (
            <Slide key={i} {...image} translateX={getInterpolate(animatedScroll, i, Image.length)} />
          )
        })}
        {/* Array.apply(null, { length: Images.length + 1}).map((_, i) => {
          return getSeparator(i);
        }) */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separate: {
    backgroundColor: "#000",
    position: "absolute",
    top: 0, bottom: 0,
    width: 3,
  }
});

export default Drinks;