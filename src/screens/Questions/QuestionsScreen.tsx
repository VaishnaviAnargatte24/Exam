import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator'; // Import navigation types

// Define props type for navigation
type QuestionsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Questions'>;
};

// Hardcoded list of questions with options and correct answers
const questions = [
  {
    id: 1,
    question: 'What is the capital of India?',
    options: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata'],
    correctAnswer: 'Delhi',
  },
  {
    id: 2,
    question: 'What is React Native?',
    options: ['A database', 'Mobile framework', 'Cloud service', 'Programming language'],
    correctAnswer: 'Mobile framework',
  },
  {
    id: 3,
    question: 'Which hook is used for state in React?',
    options: ['useContext', 'useEffect', 'useState', 'useRef'],
    correctAnswer: 'useState',
  },
];

// Main functional component for Questions screen
const QuestionsScreen: React.FC<QuestionsScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track current question index
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({}); // Store selected answers
  const [markedReview, setMarkedReview] = useState<Record<number, boolean>>({}); // Track questions marked for review

  const currentQuestion = questions[currentIndex]; // Get current question data

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: option,
    });
  };

  // Handle "Next" or "Submit" button press
  const handleNext = () => {
    if (!selectedOptions[currentQuestion.id]) {
      Alert.alert('Please select an option before proceeding.'); // Show alert if no option selected
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1); // Go to next question
    } else {
      // Navigate to summary screen with selected answers and review data
      navigation.navigate('Summary', {
        selectedOptions,
        markedReview,
      });
    }
  };

  // Handle "Mark for Review" button press
  const handleMarkForReview = () => {
    setMarkedReview({
      ...markedReview,
      [currentQuestion.id]: true,
    });

    handleNext(); // Move to next question
  };

  // Check if option is selected
  const isOptionSelected = (option: string) =>
    selectedOptions[currentQuestion.id] === option;

  // Check if current question is marked for review
  const isMarkedForReview = markedReview[currentQuestion.id];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Question {currentIndex + 1} / {questions.length}</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {/* Render list of options */}
      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              isOptionSelected(item) && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Footer with buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.reviewButton} onPress={handleMarkForReview}>
          <Text style={styles.buttonText}>
            {isMarkedForReview ? '✔ Marked' : 'Mark for Review'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionsScreen;

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '500',
  },
  option: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  optionText: {
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  reviewButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  nextButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
