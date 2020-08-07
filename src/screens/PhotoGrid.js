import React, { useState, useEffect, useRef } from 'react';
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

const gridImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, Img13, Img14, Img15, Img16, Img17];

const PhotoGrid = () => {
  const _images = useRef({});
  const _viewImage = useRef();
  const [activeImage, setActiveImage] = useState(null);
  const size = useRef(new Animated.ValueXY()).current;
  const position = useRef(new Animated.ValueXY()).current;
  const animation = useRef(new Animated.Value(0)).current;

  const handleOpenImage = index => {

  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {gridImages.map((img, index) => {
            return (
              <TouchableWithoutFeedback key={index} onPress={() => handleOpenImage(index)}>
                <Image
                  source={img}
                  style={[styles.gridImage]}
                  resizeMode="cover"
                  ref={_images[index]}
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
        <Animated.View style={[styles.bottomContent]}>
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