import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { iosColors } from '../../util';
import Icon from 'react-native-vector-icons/Foundation';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ColorPicker = () => {
  const _input = useRef();
  const animation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const [color, setColor] = useState("#000");
  const [isOpen, setIsOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleContentToggle = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false
    }).start(() => {
      setIsOpen(!isOpen);
    });
  }

  const handleInputToggle = () => {
    const toValue = isInputVisible ? 0 : 1;
    Animated.timing(buttonAnimation, {
      toValue,
      duration: 350,
      useNativeDriver: false
    }).start(() => {
      setIsInputVisible(!isInputVisible);
      //_input.current.focus();
    })
  }

  useEffect(() => {
    if (isInputVisible) {
      _input.current.focus();
    } else {
      _input.current.blur();
    }
  }, [isInputVisible])

  const scaleXInterpolate = animation.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, 0, 1]
  });

  const translateYInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  });

  const moveInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0]
  })

  const buttonStyle = {
    transform: [
      { translateX: moveInterpolate },
      { scale: buttonAnimation }
    ]
  }

  const rowStyle = {
    opacity: animation,
    transform: [
      { translateY: translateYInterpolate },
      { scaleX: scaleXInterpolate },
      { scaleY: animation },
    ]
  }

  const inputOpacityInterpolate = buttonAnimation.interpolate({
    inputRange: [0, .75, 1],
    outputRange: [0, 0, 1]
  })

  const iconTranslate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20]
  })

  const iconOpacityInterpolate = buttonAnimation.interpolate({
    inputRange: [0, .2],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const iconStyle = {
    opacity: iconOpacityInterpolate,
    transform: [
      { translateX: iconTranslate }
    ]
  }

  const inputStyle = {
    opacity: inputOpacityInterpolate
  }

  const colorStyle = {
    backgroundColor: color
  }


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.rowWrap, rowStyle]}>
        <TouchableWithoutFeedback onPress={handleInputToggle}>
          <Animated.View style={[styles.colorBall, colorStyle]} />
        </TouchableWithoutFeedback>
        <View style={[styles.row]}>
          <TouchableOpacity>
            <AnimatedIcon name="bold" size={30} color="#555" style={[iconStyle]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name="italic" size={30} color="#555" style={[iconStyle]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name="align-center" size={30} color="#555" style={[iconStyle]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name="link" size={30} color="#555" style={[iconStyle]} />
          </TouchableOpacity>

          <Animated.View
            style={[StyleSheet.absoluteFill, styles.colorRowWrap]}
            pointerEvents={isInputVisible ? "auto" : "none"}
          >
            <AnimatedTextInput
              value={color}
              onChangeText={(text) => setColor(text)}
              style={[styles.input, inputStyle]}
              ref={_input}
            />
            <TouchableWithoutFeedback onPress={handleInputToggle}>
              <Animated.View style={[styles.okButton, buttonStyle]}>
                <Text style={styles.okText}>OK</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </Animated.View>

      <TouchableOpacity onPress={handleContentToggle} style={styles.button}>
        <Text style={{color: 'black'}}>toggle open / closed</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 40,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: "50%",
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: "#333",
    shadowOpacity: .2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  colorRowWrap: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
  },
  okButton: {
    borderRadius: 20,
    width: 40,
    height: "100%",
    backgroundColor: '#309eeb',
    alignItems: 'center',
    justifyContent: 'center'
  },
  okText: {
    color: 'white',
  },
  colorBall: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: 10,
  }
})

export default ColorPicker;