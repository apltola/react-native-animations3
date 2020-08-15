import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotifyInput = () => {
  const _emailInput = useRef();
  const animation = useRef(new Animated.Value(0)).current;
  const [success, setSuccess] = useState(false);

  const handlePress = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      if (_emailInput.current) {
        _emailInput.current.focus();
      }
    });
  }

  const handleSend = () => {
    setSuccess(true);
    _emailInput.current.blur();
  }
  
  useEffect(() => {
    if (success) {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }),
        Animated.delay(1500)
      ]).start(() => {
        setSuccess(false);
      })
    }
  }, [success])

  const inputScaleInterpolate = animation.interpolate({
    inputRange: [0, .5, .6],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });

  const inputScaleStyle = {
    transform: [
      { scale: inputScaleInterpolate }
    ]
  }

  const sendButtonInterpolate = animation.interpolate({
    inputRange: [0, .6, 1],
    outputRange: [0, 0, 1]
  });

  const sendButtonStyle = {
    transform: [
      { scale: sendButtonInterpolate }
    ]
  }

  const widthInterpolate = animation.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [150, 150, 300],
    extrapolate: "clamp"
  });

  const buttonWrapStyle = {
    width: widthInterpolate
  }

  const notifyTextScaleInterpolate = animation.interpolate({
    inputRange: [0, .5],
    outputRange: [1, 0],
    extrapolate: "clamp"
  })

  const notifyTextStyle = {
    transform: [
      { scale: notifyTextScaleInterpolate }
    ]
  }

  const thankYouScaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const thankYouTextStyle = {
    transform: [
      { scale: thankYouScaleInterpolate }
    ]
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View style={[styles.buttonWrap, buttonWrapStyle]}>

        {!success && <Animated.View style={[StyleSheet.absoluteFill, styles.inputWrap, inputScaleStyle]}>
          <TextInput
            ref={_emailInput}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="rgba(255,123,115,0.8)"
            style={styles.textInput}
          />
          <TouchableWithoutFeedback onPress={handleSend}>
            <Animated.View style={[styles.sendButton, sendButtonStyle]}>
              <Text style={styles.sendText}>Send</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>}

        {!success && <Animated.View style={notifyTextStyle}>
          <Text style={styles.notifyText}>Notify me</Text>
        </Animated.View>}

        {success && <Animated.View style={thankYouTextStyle}>
          <Text style={styles.notifyText}>Thanks!</Text>
        </Animated.View>}
        
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
    backgroundColor: "#ff7b73"
  },
  buttonWrap: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 4,
  },
  sendButton: {
    backgroundColor: "#ff7b73",
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  sendText: {
    color: "#fff"
  },
  notifyText: {
    color: "#ff7b73",
    fontWeight: "bold",
  }
})

export default NotifyInput;