import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
const { width, height } = Dimensions.get("window");

const Moment = props => {
  const animatedStyle = {
    transform: [
      { translateX: props.translateX || 0 }
    ]
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={props.image}
        style={[styles.image, animatedStyle]}
        resizeMode="cover"
      />
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>
            {props.title}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    overflow: "hidden"
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  center: {
    justifyContent: "center",
  },
  textWrap: {
    backgroundColor: "rgba(0,0,0,.5)",
    paddingVertical: 10
  },
  title: {
    backgroundColor: "transparent",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  }
})

export default Moment;