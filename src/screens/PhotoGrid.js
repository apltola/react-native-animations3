import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { iosColors } from '../../util';
import Img1 from '../../assets/images/image1.jpg';
import Img2 from '../../assets/images/image2.jpg';
import Img3 from '../../assets/images/image3.jpg';
import Img4 from '../../assets/images/image4.jpg';
import Img5 from '../../assets/images/image5.jpg';
import Img6 from '../../assets/images/image6.jpg';
import Img7 from '../../assets/images/image7.jpg';
import Img8 from '../../assets/images/image8.jpg';
import Img9 from '../../assets/images/image9.jpg';
import Img10 from '../../assets/images/image10.jpg';
import Img11 from '../../assets/images/image11.jpg';
import Img12 from '../../assets/images/image12.jpg';
import Img13 from '../../assets/images/image13.jpg';
import Img14 from '../../assets/images/image14.jpg';
import Img15 from '../../assets/images/image15.jpg';
import Img16 from '../../assets/images/image16.jpg';
import Img17 from '../../assets/images/image17.jpg';

const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, Img13, Img14, Img15, Img16, Img17];
//let imgs;

const PhotoGrid = () => {
  const _gridImages = {
    "0": useRef(),
    "1": useRef(),
    "2": useRef(),
    "3": useRef(),
    "4": useRef(),
    "5": useRef(),
    "6": useRef(),
    "7": useRef(),
    "8": useRef(),
    "9": useRef(),
    "10": useRef(),
    "11": useRef(),
    "12": useRef(),
    "13": useRef(),
    "14": useRef(),
    "15": useRef(),
    "16": useRef()
  }

  const _viewImage = useRef();
  const [activeImage, setActiveImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const size = useRef(new Animated.ValueXY()).current;
  const position = useRef(new Animated.ValueXY()).current;
  const animation = useRef(new Animated.Value(0)).current;

  const [_x, setX] = useState(null);
  const [_y, setY] = useState(null);
  const [_width, setWidth] = useState(null);
  const [_height, setHeight] = useState(null);

  /* const jokureffi = useCallback((node, i) => {
    if (node !== null) {
      //console.log(i)
      //setImgs(prev => ({ ...prev, [`${i}`]: node }));
    }
  }, []) */

  const handleOpenImage = index => {
    if (_gridImages[index].current.measure) {
      _gridImages[index].current.measure((x, y, width, height, pageX, pageY) => {
        setX(x);
        setY(y);
        setWidth(width);
        setHeight(height);

        position.setValue({
          x: pageX,
          y: pageY
        });
        size.setValue({
          x: pageX,
          y: pageY
        });

        setActiveImage(images[index]);
        setActiveIndex(index);
      })
    }
  }

  const animatedContentTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  })

  const animatedContentStyles = {
    opacity: animation,
    transform: [
      { translateY: animatedContentTranslate }
    ]
  }

  const activeImageStyle = {
    width: size.x,
    height: size.y,
    top: position.y,
    left: position.x
  }

  const activeIndexStyle = {
    opacity: activeImage ? 0 : 1
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {images.map((img, index) => {

            const style = index === activeIndex ? activeIndexStyle : null;

            return (
              <TouchableWithoutFeedback key={index} onPress={() => handleOpenImage(index)}>
                <Image
                  source={img}
                  style={[styles.gridImage, style]}
                  resizeMode="cover"
                  ref={_gridImages[index]}
                  //ref={jokureffi}
                />
              </TouchableWithoutFeedback>
            )
          })}
        </View>
      </ScrollView>

      <View style={StyleSheet.absoluteFill} pointerEvents={activeImage ? "auto" : "none"}>
        <View style={styles.topContent} ref={_viewImage}>
          <Animated.Image
            key={activeImage}
            source={activeImage}
            resizeMode="cover"
            style={[styles.viewImage]}
          />
        </View>
        <Animated.View style={[styles.bottomContent, animatedContentStyles]}>
          <Text style={styles.title}>Pretty Image</Text>    
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridImage: {
    //width: "33%",
    width: Dimensions.get("window").width / 3,
    height: 130,
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {
    flex: 2,
    backgroundColor: "#FFF",
  },
  viewImage: {
    width: null,
    height: null,
    position: "absolute",
    top: 0, left: 0,
  },
  title: {
    fontSize: 26,
  }
})

export default PhotoGrid;