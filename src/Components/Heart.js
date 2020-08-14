import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';


const Heart = ({ filled, style, ...props }) => {
  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeaft, styles.heartShape, styles.emptyFill]} />
      <View style={[styles.rightHeaft, styles.heartShape, styles.emptyFill]} />
    </View>
  )

  const fillStyle = filled ? styles.filledHeart : styles.empty

  return (
    <Animated.View {...props} style={[styles.heart, style]}>
      <View style={[styles.leftHeaft, styles.heartShape, fillStyle]} />
      <View style={[styles.rightHeaft, styles.heartShape, fillStyle]} />
      {!filled && centerNonFilled}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  filledHeart: {
    backgroundColor: "#e31745",
  },
  fit: {
    transform: [
      { scale: .9 }
    ]
  },
  emptyFill: {
    backgroundColor: "#FFF",
  },
  empty: {
    backgroundColor: "#ccc",
  },
  leftHeaft: {
    transform: [
      { rotate: "-45deg" }
    ],
    left: 5,
    backgroundColor: "#000"
  },
  rightHeaft: {
    transform: [
      { rotate: "45deg" }
    ],
    right: 5,
    backgroundColor: "#000"
  },
})

export default Heart;