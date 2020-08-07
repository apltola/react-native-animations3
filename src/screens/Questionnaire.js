import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native';
import { iosColors } from '../../util';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");

const Questionnaire = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([
    "Do you believe in ghosts?",
    "Have you ever seen a UFO?",
    "Can you play poker?",
    "Do you have a twin?",
    "Were you born in the summer?",
    "Do you know the Schrödinger equation of quantum theory?",
    "Do you know how to swim?",
    "Have you ever pooped in your pants after your 18?"
  ]);

  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, questions.length],
    outputRange: ["0%", "100%"]
  })

  const progressBarStyle = {
    width: progressInterpolate
  }

  const mainQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width]
  })

  const nextQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0]
  })

  const mainStyle = {
    transform: [
      { translateX: mainQuestionInterpolate }
    ]
  }
  const nextStyle = {
    transform: [
      { translateX: nextQuestionInterpolate }
    ]
  }

  const handleAnswer = () => {
    Animated.parallel([
      Animated.timing(progressAnim, {
        toValue: index + 1,
        duration: 400,
        useNativeDriver: false,
      }).start(),
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        setIndex(prev => prev + 1)
      })
    ])
  }

  useEffect(() => {
    animation.setValue(0);
  }, [index])

  const getNextQuestion = () => {
    if (index + 1 <= questions.length) {
      return questions[index + 1]
    }
  }

  const handleRefresh = () => {
    setIndex(0);
    progressAnim.setValue(0);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity onPress={handleRefresh}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', }}>
            start over
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        <Animated.Text style={[styles.questionText, mainStyle]}>
          {questions[index]}
        </Animated.Text>      
        <Animated.Text style={[styles.questionText, nextStyle]}>
          {getNextQuestion()}
        </Animated.Text>      
      </View>

      <View style={styles.progress}>
        <Animated.View style={[styles.bar, progressBarStyle]} />
      </View>
      <TouchableOpacity onPress={handleAnswer} activeOpacity={.7} style={styles.option} disabled={index === questions.length}>
        <Text style={styles.optionText}>No</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAnswer} activeOpacity={.7} style={[styles.option, styles.yes]} disabled={index === questions.length}>
        <Text style={styles.optionText}>Yes</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E22D4B',
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  yes: {
    backgroundColor: "rgba(255,255,255,.1)"
  },
  optionText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    fontSize: 26,
    color: '#FFF',
    textAlign: 'center',
    padding: 10,
  },
  progress: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 20,
  },
  bar: {
    height: "100%",
    //width: "50%",
    backgroundColor: "#f1f1f1",
  },
  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    zIndex: 9
  }
})

export default Questionnaire;