import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionButton = () => {
  const animation = useRef(new Animated.Value(1)).current;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false
    }).start(() => {
      setIsOpen(!isOpen);
    });
  }

  const reloadStyle = {
    transform: [
      { scale: animation },
      { translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -75]
      })}
    ]
  }

  const orderStyle = {
    transform: [
      { scale: animation },
      { translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -150]
      })}
    ]
  }

  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -90]
  });

  const labelOpacityInterpolate = animation.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, 0, 1]
  })

  const labelStyle = {
    transform: [
      { translateX: labelPositionInterpolate}
    ],
    opacity: labelOpacityInterpolate
  }

  const backgroundStyle = {
    transform: [{
      scale: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 23]
      })
    }]
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, backgroundStyle]} />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.otherButton, orderStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>Order</Animated.Text>
          <Icon name="food-fork-drink" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.otherButton, reloadStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>Reload</Animated.Text>
          <Icon name="reload" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, styles.pay]}>
          <Animated.Text style={[styles.label, labelStyle]}>Pay</Animated.Text>
          <Text style={styles.payText}>5,00€</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#333",
    shadowOpacity: .4,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 3.5,
    borderRadius: 30, 
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  otherButton: {
    backgroundColor: 'white',
  },
  pay: {
    backgroundColor: "#00b15e"
  },
  payText: {
    color: "#FFF",
  },
  label: {
    color: "#FFF",
    position: "absolute",
    fontSize: 18,
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
  background: {
    backgroundColor: "rgba(0,0,0,.3)",
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30,
  }
})

export default ActionButton;