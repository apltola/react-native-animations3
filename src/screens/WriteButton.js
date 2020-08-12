import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");

const WriteButton = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const _input = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTransform = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 550,
      useNativeDriver: false
    }).start(() => {
      setIsOpen(!isOpen);
    });
  }

  useEffect(() => {
    if (isOpen) {
      _input.current.focus();
    } else {
      _input.current.blur();
    }
  }, [isOpen])

  const editorWidthInterpolate = animation.interpolate({
    inputRange: [0, .5],
    outputRange: [100, width-40],
    extrapolate: "clamp"
  });

  const toolbarOpacityInterpolate = animation.interpolate({
    inputRange: [0, .5],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });

  const toolbarStyles = {
    opacity: toolbarOpacityInterpolate
  }

  const editorHeightInterpolate = animation.interpolate({
    inputRange: [.7, 1],
    outputRange: [0, 200],
    extrapolate: "clamp"
  });

  const editorStyle = {
    opacity: animation,
    height: editorHeightInterpolate
  }

  const buttonOpacityInterpolate = animation.interpolate({
    inputRange: [0, .3],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  const buttonStyles = {
    opacity: buttonOpacityInterpolate
  }

  const closeBtnOpacityInterpolate = animation.interpolate({
    inputRange: [.7, 1],
    outputRange: [0, 1]
  })

  const closeBtnStyles = {
    opacity: closeBtnOpacityInterpolate
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.center}>
        <Animated.View style={[styles.editor, {width: editorWidthInterpolate}]}>
          <View style={styles.bar}>
            <Animated.View style={[styles.toolBar, toolbarStyles]}>
              <Icon name="format-bold" color="#fff" size={20} style={styles.icon} />
              <Icon name="format-italic" color="#fff" size={20} style={styles.icon} />
              <Icon name="format-underline" color="#fff" size={20} style={styles.icon} />
              <Icon name="format-list-bulleted" color="#fff" size={20} style={styles.icon} />
              <Icon name="format-list-numbered" color="#fff" size={20} style={styles.icon} />
              <View style={styles.rightInnerBar}>
                <Icon name="link" color="#fff" size={20} style={styles.icon} />
                <Icon name="image" color="#fff" size={20} style={styles.icon} />
                <Icon name="arrow-down-bold-box" color="#fff" size={20} style={styles.icon} />
              </View>
            </Animated.View>

            <Animated.View style={[StyleSheet.absoluteFill, styles.center, buttonStyles]} pointerEvents={isOpen ? "none" : "auto"}>
              <TouchableWithoutFeedback onPress={toggleTransform}>
                <View>
                  <Text style={styles.buttonText}>Write</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>

            <Animated.View style={[styles.closeButton, closeBtnStyles]}>
              <TouchableWithoutFeedback onPress={toggleTransform}>
                <View>
                  <Text>X Close</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
          <Animated.View style={[styles.lowerView, editorStyle]}>
            <TextInput
              placeholder="Start writing..."
              multiline
              ref={_input}
              style={[StyleSheet.absoluteFill, styles.input]}
            />
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  editor: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)"
  },
  bar: {
    height: 50,
    backgroundColor: "#2979ff",
    justifyContent: 'center',
  },
  toolBar: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    marginHorizontal: 5,
  },
  rightInnerBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lowerView: {
    //height: 150,
  },
  input: {
    padding: 10,
    fontSize: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: -40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
    padding: 10,
  }
});

export default WriteButton;