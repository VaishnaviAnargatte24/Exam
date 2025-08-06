import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExamSelectionScreen from '../screens/ExamSelection/ExamSelectionScreen'; // 👈 import your new screen
import LoginScreen from '../screens/Login/LoginScreen';
import InstructionsScreen from '../screens/Instructions/InstructionsScreen';
import QuestionsScreen from '../screens/Questions/QuestionsScreen';
import SummaryScreen from '../screens/Summary/SummaryScreen';
import ResultScreen from '../screens/Result/ResultScreen';

export type RootStackParamList = {
  ExamSelection: undefined; // 👈 add this
  Login: undefined;
  Instructions: undefined;
  Questions: undefined;
  Summary: undefined;
  Result: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ExamSelection" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExamSelection" component={ExamSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Instructions" component={InstructionsScreen} />
      <Stack.Screen name="Questions" component={QuestionsScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
