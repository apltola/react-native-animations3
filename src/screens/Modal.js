import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';

const Modal = () => {
  const animated = useRef(new Animated.Value(0)).current;
  const animatedMargin = useRef(new Animated.Value(0)).current;
  /* const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0); */
  let scrollOffset = 0;
  let contentHeight = 0;
  let scrollViewHeight = 0;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      const { dy } = gestureState;
      const totalScrollHeight = scrollOffset + scrollViewHeight

      if (
        (scrollOffset <= 0 && dy > 0) ||
        ((totalScrollHeight >= contentHeight) && dy < 0)
      ) {
        return true;
      }
    },
    onPanResponderMove: (event, gestureState) => {
      const { dy } = gestureState;
      if (dy < 0) {
        animated.setValue(dy);
      } else if (dy > 0) {
        animatedMargin.setValue(dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const { dy } = gestureState;
      console.log(dy);
      if (dy < -150) {
        Animated.parallel([
          Animated.timing(animated, {
            toValue: -400,
            duration: 150,
            useNativeDriver: false
          }),
          Animated.timing(animatedMargin, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false
          })
        ]).start()
      } else if (dy > -150 && dy < 150) {
        Animated.parallel([
          Animated.timing(animated, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false
          }),
          Animated.timing(animatedMargin, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false
          })
        ]).start();
      } else if (dy > 150) {
        Animated.timing(animated, {
          toValue: 400,
          duration: 300,
          useNativeDriver: false
        }).start();
      }
    }
  })).current;

  const spacerStyle = {
    marginTop: animatedMargin
  }

  const opacityInterpolate = animated.interpolate({
    inputRange: [-400, 0, 400],
    outputRange: [0, 1, 0]
  })

  const modalStyle = {
    transform: [
      { translateY: animated }
    ],
    opacity: opacityInterpolate
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[spacerStyle]} />
      <Animated.View style={[styles.modal, modalStyle]} {...panResponder.panHandlers}>
        <View style={styles.comments}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={event => {
              //console.log("event => ", event);
              scrollOffset = event.nativeEvent.contentOffset.y
              scrollViewHeight = event.nativeEvent.layoutMeasurement.height
            }}
            onContentSizeChange={(contentWidth, _contentHeight) => {
              contentHeight = _contentHeight
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
    padding: 30
  },
  modal: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)"
  },
  comments: {
    flex: 1,
  },
  mjaa: {
    padding: 10,
    fontSize: 16,
  },
  lorem: {
    padding: 10,
    fontSize: 16,
    lineHeight: 26,
  }
});

export default Modal;