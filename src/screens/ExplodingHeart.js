import React, { useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, Animated, View, StyleSheet } from 'react-native';
import Heart from '../Components/Heart';

const getTransformationAnimation = (animation, scale, y, x, rotate, opacity) => {
  const scaleAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scale]
  })

  const xAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, x]
  })

  const yAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, y]
  })

  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", rotate]
  })
  const opacityAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity]
  })

  return {
    opacity: opacityAnimation,
    transform: [
      { scale: scaleAnimation },
      { translateX: xAnimation },
      { translateY: yAnimation },
      { rotate: rotateAnimation }
    ]
  }
}

const ExplodingHeart = () => {
  const [liked, setLiked] = useState(null);
  const [shouldBeDisabled, setShouldBeDisabled] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [animations, setAnimations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]);

  const toggleLike = () => {
    setLiked(prev => !prev);
  }

  useEffect(() => {
    if (liked === false) {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false
      }).start(() => {
        scaleAnimation.setValue(0);
      });
    }
    
    else if (liked) {
      const showAnimations = animations.map((animation) => {
        return Animated.spring(animation, {
          toValue: 1,
          friction: 4,
          useNativeDriver: false
        })
      })
  
      const hideAnimations = animations.map(animation => {
        return Animated.timing(animation, {
          toValue: 0,
          duration: 40,
          useNativeDriver: false
        })
      }).reverse();

      setShouldBeDisabled(true)

      Animated.parallel([
        Animated.spring(scaleAnimation, {
          toValue: 1,
          friction: 3,
          useNativeDriver: false
        }),
        Animated.sequence([
          Animated.stagger(50, showAnimations),
          //Animated.delay(10),
          Animated.stagger(50, hideAnimations)
        ])
      ]).start(() => {
        scaleAnimation.setValue(0);
        setShouldBeDisabled(false)
      });

    }
  }, [liked])

  const bounceInterpolate = scaleAnimation.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [1, .8, 1]
  })

  const heartButtonStyle = {
    transform: [
      { scale: bounceInterpolate }
    ]
  }

  return (
    <View style={styles.container}>
      <View>
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[0], .4, -280, 0, "10deg", .7)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[1], .7, -120, 40, "45deg", .8)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[2], .8, -120, -40, "-45deg", .3)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[3], .3, -150, 120, "-35deg", .6)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[4], .3, -120, -120, "-35deg", .7)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[5], .8, -60, 0, "35deg", .8)]} />
        <TouchableWithoutFeedback onPress={toggleLike} disabled={shouldBeDisabled ? true: false}>
          <Animated.View style={[heartButtonStyle]}>
            <Heart filled={liked} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    position: "absolute",
    top: 0,
    left: 0
  }
});

export default ExplodingHeart;