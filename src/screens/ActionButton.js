import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { iosColors } from '../../util';
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

  return (
    <View style={styles.container}>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.otherButton, orderStyle]}>
          <Icon name="food-fork-drink" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.otherButton, reloadStyle]}>
          <Icon name="reload" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, styles.pay]}>
          <Text style={styles.payText}>5,00€</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center"
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#333",
    shadowOpacity: .1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
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
})

export default ActionButton;