// AppNavigator.tsx

// Importing necessary libraries and components
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing all screen components used in the app
import ExamSelectionScreen from '../screens/ExamSelection/ExamSelectionScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import InstructionsScreen from '../screens/Instructions/InstructionsScreen';
import QuestionsScreen from '../screens/Questions/QuestionsScreen';
import SummaryScreen from '../screens/Summary/SummaryScreen';
import ResultScreen from '../screens/Result/ResultScreen';

// Define types for selected options per question
type SelectedOptions = {
  [questionId: string]: string; // question ID mapped to selected option
};

// Define types for questions marked for review
type MarkedReview = {
  [questionId: string]: boolean; // question ID mapped to true/false for review
};

// Define route parameter types for all screens in the stack
export type RootStackParamList = {
  ExamSelection: undefined; // no params
  Login: undefined;         // no params
  Instructions: undefined;  // no params
  Questions: undefined;     // no params
  Summary: {                // Summary receives selected options and marked reviews
    selectedOptions: SelectedOptions;
    markedReview: MarkedReview;
  };
  Result: {                 // Result screen receives selected options only
    selectedOptions: SelectedOptions;
  };
};

// Create a Native Stack Navigator with typed parameters
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the app's navigation structure
const AppNavigator = () => {
  return (
    // Navigation container with header hidden for all screens
    <Stack.Navigator initialRouteName="ExamSelection" screenOptions={{ headerShown: false }}>
      {/* Register all screens in the navigator */}
      <Stack.Screen name="ExamSelection" component={ExamSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Instructions" component={InstructionsScreen} />
      <Stack.Screen name="Questions" component={QuestionsScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

// Export the navigator to be used in App.tsx
export default AppNavigator;
