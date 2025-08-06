import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// 👇 Define question type
type Question = {
  id: string;
  question: string;
  options: string[];
};

// 👇 Define navigation types
type RootStackParamList = {
  Exam: undefined;
  Summary: {
    selectedOptions: SelectedOptions;
    markedReview: MarkedReview;
  };
};

type ExamScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Exam'
>;

type ExamScreenRouteProp = RouteProp<RootStackParamList, 'Exam'>;

type Props = {
  navigation: ExamScreenNavigationProp;
  route: ExamScreenRouteProp;
};

// 👇 Selected option type
type SelectedOptions = {
  [questionId: string]: string;
};

type MarkedReview = {
  [questionId: string]: boolean;
};

// 👇 Dummy question data
const questions: Question[] = [
  {
    id: '1',
    question: 'What is the capital of India?',
    options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
  },
  {
    id: '2',
    question: 'Who wrote the national anthem of India?',
    options: ['Rabindranath Tagore', 'Bankim Chandra', 'Gandhi', 'Nehru'],
  },
  {
    id: '3',
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
  },
];

const ExamScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [markedReview, setMarkedReview] = useState<MarkedReview>({});

  const handleOptionSelect = (questionId: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  const toggleReview = (questionId: string) => {
    setMarkedReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSubmit = () => {
    navigation.navigate('Summary', {
      selectedOptions,
      markedReview,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Mock Exam</Text>

      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.questionCard}>
            <Text style={styles.question}>
              {index + 1}. {item.question}
            </Text>

            {item.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedOptions[item.id] === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(item.id, option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.reviewButton,
                markedReview[item.id] && styles.markedForReview,
              ]}
              onPress={() => toggleReview(item.id)}>
              <Text style={styles.reviewText}>
                {markedReview[item.id] ? '✅ Marked for Review' : '📌 Mark for Review'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>📋 Go to Summary</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: '#e1e1e1',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  selectedOption: {
    backgroundColor: '#90ee90',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  reviewButton: {
    marginTop: 10,
    backgroundColor: '#f0ad4e',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  markedForReview: {
    backgroundColor: '#ff9800',
  },
  reviewText: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
