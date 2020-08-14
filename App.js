import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Questionnaire from './src/screens/Questionnaire';
import ProgressButton from './src/screens/ProgressButton';
import PhotoGrid from './src/screens/PhotoGrid';
import Joku from './src/screens/Joku';
import ColorPicker from './src/screens/ColorPicker';
import ActionButton from './src/screens/ActionButton';
import IntroScreen from './src/screens/IntroScreen';
import WriteButton from './src/screens/WriteButton';
import Modal from './src/screens/Modal';
import Jeejee from './src/screens/Jeejee';
import Drinks from './src/screens/HorizontalScroll';
import FloatingHearts from './src/screens/FloatingHearts';

const Tab = createBottomTabNavigator();

export default function App() {
  const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgb(255,255,255)',
    }
  }

  return (
    <NavigationContainer theme={Theme}>
      <Tab.Navigator initialRouteName="10">
        <Tab.Screen name="1" component={Questionnaire} />
        <Tab.Screen name="2" component={ProgressButton} />
        <Tab.Screen name="3" component={PhotoGrid} />
        <Tab.Screen name="4" component={ColorPicker} />
        <Tab.Screen name="5" component={ActionButton} />
        <Tab.Screen name="6" component={IntroScreen} />
        <Tab.Screen name="7" component={WriteButton} />
        <Tab.Screen name="8" component={Modal} />
        <Tab.Screen name="9" component={Drinks} />
        <Tab.Screen name="10" component={FloatingHearts} />
      </Tab.Navigator>

      <StatusBar style="dark" /* hidden *//>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
