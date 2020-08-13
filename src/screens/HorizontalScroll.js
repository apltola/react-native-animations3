import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView, PixelRatio } from 'react-native';
import Moment from '../../Moment';

const Images = [
  { image: require('../../assets/drinkImages/drink1.jpg'), title: "Vodka Cran" },
  { image: require('../../assets/drinkImages/drink2.jpg'), title: "Old Fashioned" },
  { image: require('../../assets/drinkImages/drink3.jpg'), title: "Mule" },
  { image: require('../../assets/drinkImages/drink4.jpg'), title: "Strawberry Daiquiri" },
];

const { width, height } = Dimensions.get("window");

const Drinks = () => {
  const animatedScroll = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animatedScroll
                }
              }
            }
          ],
          { useNativeDriver: false }
        )}
      >
        {Images.map((image, i) => {
          return (
            <Moment key={i} {...image} />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Drinks;