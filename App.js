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
      <Tab.Navigator initialRouteName="write">
        <Tab.Screen name="questions" component={Questionnaire} />
        <Tab.Screen name="button" component={ProgressButton} />
        <Tab.Screen name="photos" component={PhotoGrid} />
        <Tab.Screen name="color" component={ColorPicker} />
        <Tab.Screen name="menu" component={ActionButton} />
        <Tab.Screen name="intro" component={IntroScreen} />
        <Tab.Screen name="write" component={WriteButton} />
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
