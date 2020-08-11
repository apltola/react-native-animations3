import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Image1 from '../../assets/images2/imgs_s1_1.png';
import Image2 from '../../assets/images2/imgs_s1_2.png';
import Image3 from '../../assets/images2/imgs_s1_3.png';

const { width, height } = Dimensions.get("window");

const getScreen1Styles = (animation, width) => {
  const image2TranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -100],
    extrapolate: "clamp"
  });

  return {
    image2: {
      transform: [
        { translateX: image2TranslateX }
      ]
    }
  }
}

const getScreen2Styles = (animation, width) => {
  const inputRange = [0, width, width * 2];

  const image2TranslateY = animation.interpolate({
    inputRange,
    outputRange: [100, 0, -100],
    extrapolate: "clamp"
  })

  const image2Opacity = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp"
  })

  return {
    image2: {
      opacity: image2Opacity,
      transform: [
        { translateY: image2TranslateY }
      ]
    }
  }
}

const getScreen3Styles = (animation, width) => {
  const inputRange = [width, width * 2, width * 3];

  const imageScale = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp"
  })

  const image2Rotate = animation.interpolate({
    inputRange,
    outputRange: ["-180deg", "0deg", "180deg"],
    extrapolate: "clamp"
  })

  return {
    image1: {
      transform: [
        { scale: imageScale }
      ]
    },
    image2: {
      transform: [
        { scale: imageScale },
        { rotate: image2Rotate }
      ]
    }
  }
}

const IntroScreen = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const screen1Styles = getScreen1Styles(animation, width);
  const screen2Styles = getScreen2Styles(animation, width);
  const screen3Styles = getScreen3Styles(animation, width);

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.container]}
        pagingEnabled
        horizontal
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: animation
              }
            }
          }
        ], {
          useNativeDriver: false
        })}
      >
        <View style={styles.screen}>
          <View style={styles.screenHeader}>
            <Animated.Image
              source={Image1}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(100),
                width: PixelRatio.getPixelSizeForLayoutSize(100)
              }}
              resizeMode="contain"
            />
            <Animated.Image
              source={Image2}
              style={[
                {
                  width: PixelRatio.getPixelSizeForLayoutSize(60),
                  width: PixelRatio.getPixelSizeForLayoutSize(60),
                  position: "absolute",
                  top: 75,
                  left: 60
                },
                screen1Styles.image2
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Image3}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(35),
                width: PixelRatio.getPixelSizeForLayoutSize(35),
                position: "absolute",
                top: 65,
                left: 60
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.screenBottom}>
            <Text style={styles.screenText}>screen 1</Text>
          </View>
        </View>

        {/* screen kakkone */}
        <View style={styles.screen}>
          <View style={styles.screenHeader}>
            <Animated.Image
              source={Image1}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(100),
                width: PixelRatio.getPixelSizeForLayoutSize(100)
              }}
              resizeMode="contain"
            />
            <Animated.Image
              source={Image2}
              style={[
                {
                  width: PixelRatio.getPixelSizeForLayoutSize(60),
                  width: PixelRatio.getPixelSizeForLayoutSize(60),
                  position: "absolute",
                  top: 75,
                  left: 60
                },
                screen2Styles.image2
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Image3}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(35),
                width: PixelRatio.getPixelSizeForLayoutSize(35),
                position: "absolute",
                top: 65,
                left: 60
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.screenBottom}>
            <Text style={styles.screenText}>screen 2</Text>
          </View>
        </View>

        {/* screen kolmone */}
        <View style={styles.screen}>
          <View style={styles.screenHeader}>
            <Animated.Image
              source={Image1}
              style={[{
                width: PixelRatio.getPixelSizeForLayoutSize(100),
                width: PixelRatio.getPixelSizeForLayoutSize(100)
              },
                screen3Styles.image1
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Image2}
              style={[
                {
                  width: PixelRatio.getPixelSizeForLayoutSize(60),
                  width: PixelRatio.getPixelSizeForLayoutSize(60),
                  position: "absolute",
                  top: 75,
                  left: 60
                },
                screen3Styles.image2
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Image3}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(35),
                width: PixelRatio.getPixelSizeForLayoutSize(35),
                position: "absolute",
                top: 65,
                left: 60
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.screenBottom}>
            <Text style={styles.screenText}>screen 3</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    backgroundColor: "#F89e20",
    width,
    height
  },
  screenHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    //borderWidth: 1,
  },
  screenBottom: {
    flex: 1,
  },
  screenText: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold"
  }
})

export default IntroScreen;