import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

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

const QuestionsScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedReview, setMarkedReview] = useState({});

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: option,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Summary', {
        selectedOptions,
        markedReview,
      });
    }
  };

  const handleMarkForReview = () => {
    setMarkedReview({
      ...markedReview,
      [currentQuestion.id]: true,
    });
    handleNext();
  };

  const isOptionSelected = (option) =>
    selectedOptions[currentQuestion.id] === option;

  const isMarkedForReview = markedReview[currentQuestion.id];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Question {currentIndex + 1} / {questions.length}</Text>

      <Text style={styles.question}>{currentQuestion.question}</Text>

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
