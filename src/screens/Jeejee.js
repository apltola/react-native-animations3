import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';


const Modal = () => {
  const positionAnimation = useRef(new Animated.Value(0)).current;
  const marginAnimation = useRef(new Animated.Value(0)).current;
  let scrollOffset = 0;
  let scrollViewHeight = 0;
  let contentHeight = 0;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => {
      const { dy } = gestureState;
      const totalScrollHeight = scrollViewHeight + scrollOffset;
      if (
        (dy > 0 && scrollOffset <= 0) ||
        (dy < 0 && (totalScrollHeight >= contentHeight))
      ) {
        return true;
      }
    },
    onPanResponderMove: (e, gestureState) => {
      const { dy } = gestureState;
      if (dy < 0) {
        positionAnimation.setValue(dy*0.6);
      } else if (dy > 0) {
        marginAnimation.setValue(dy*0.6);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const { dy } = gestureState;

      if (dy > 200) {
        Animated.timing(positionAnimation, {
          toValue: 400,
          duration: 300,
          useNativeDriver: false
        }).start();
      } else if (dy < 200 && dy > -200) {
        Animated.parallel([
          Animated.timing(positionAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
          }),
          Animated.timing(marginAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
          })
        ]).start();
      } else if (dy < -200) {
        Animated.parallel([
          Animated.timing(positionAnimation, {
            toValue: -400,
            duration: 200,
            useNativeDriver: false
          }),
          Animated.timing(marginAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
          })
        ]).start()

      }
    }
  })).current;

  const spacerStyle = {
    marginTop: marginAnimation
  }

  const modalOpacityInterpolate = positionAnimation.interpolate({
    inputRange: [-400, 0, 400],
    outputRange: [0, 1, 0]
  });

  const modalStyle = {
    transform: [
      { translateY: positionAnimation }
    ],
    opacity: modalOpacityInterpolate
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[spacerStyle]} />
      <Animated.View style={[styles.modal, modalStyle]} {...panResponder.panHandlers}>
        <View style={{flex:1}}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={event => {
              //console.log(event.nativeEvent.contentOffset.y);
              scrollOffset = event.nativeEvent.contentOffset.y;
              scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
            }}
            onContentSizeChange={(width, height) => {
              //console.log("height => ", height);
              contentHeight = height;
            }}
          >
            <Text style={styles.mjaa}>Top</Text>
            <Text style={styles.lorem}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis nisi nulla, ac tempus sapien convallis tincidunt. Cras quis mollis neque. Vivamus quis pretium velit. Praesent pretium tellus id sagittis dapibus. Praesent ac pretium massa. Quisque ligula tortor, vehicula quis varius eget, auctor sit amet sapien. Donec elit velit, condimentum quis magna non, bibendum fermentum augue. Pellentesque tincidunt maximus feugiat. Cras pharetra tristique tortor et interdum. Morbi at lacus quis neque dignissim mattis a at lorem. Maecenas iaculis, nisl eu varius facilisis, sapien metus malesuada arcu, id tincidunt risus metus at erat. Curabitur rhoncus fermentum rhoncus. Nulla semper maximus neque id imperdiet. Nam vulputate, nibh eu molestie porttitor, dolor erat consequat lorem, id gravida dui est et diam. Nullam egestas est rhoncus, malesuada nibh sed, consectetur lorem. Aliquam lacinia turpis sed lacus consectetur tincidunt. Nulla sed scelerisque ipsum. Vestibulum ac condimentum metus, egestas suscipit mauris. Aliquam dictum, ex vulputate auctor tincidunt, justo ipsum fermentum elit, a tincidunt enim ante ut risus. Quisque laoreet sagittis nulla, sit amet auctor risus tincidunt id. Fusce quis urna ligula. Pellentesque venenatis tempor lorem, ac rutrum eros sagittis sit amet.</Text>
            <Text style={styles.mjaa}>Bottom</Text>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    margin: 30,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
    padding: 10,
    overflow: "hidden",
  },
  lorem: {
    fontSize: 16,
    lineHeight: 22,
  }
});

export default Modal;