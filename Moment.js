import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
const { width, height } = Dimensions.get("window");

const Moment = props => {
  return (
    <View style={styles.container}>
      <Animated.Image
        source={props.image}
        style={styles.image}
        resizeMode="cover"
      />
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
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
  }
})

export default Moment;