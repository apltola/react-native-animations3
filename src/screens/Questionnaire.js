import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Animated, View, StyleSheet, PanResponder, Text, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native';
import { iosColors } from '../../util';
import { SafeAreaView } from 'react-native-safe-area-context';

const Questionnaire = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([
    "Do you tend to follow directions when given?",
    "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
    "Would you enjoy making sure your customers leave happy?",
    "Are you willing to work nights and weekends (and possibly holidays)?"
  ]);

  const handleAnswer = () => {

  }

  const question = questions[index];
  let nextQuestion;
  if (index + 1 < questions.length) {
    nextQuestion = questions[index + 1]
  }

  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        <Animated.Text style={[styles.questionText]}>
          {question}
        </Animated.Text>      
        <Animated.Text style={[styles.questionText]}>
          {nextQuestion}
        </Animated.Text>      
      </View>

      <TouchableOpacity onPress={handleAnswer} activeOpacity={.7} style={styles.option}>
        <Text style={styles.optionText}>No</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAnswer} activeOpacity={.7} style={[styles.option, styles.yes]}>
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
    fontSize: 30,
    color: 'white',
    marginBottom: 50
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
  }
})

export default Questionnaire;