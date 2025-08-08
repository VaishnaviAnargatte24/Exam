import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ResultScreenProps = NativeStackScreenProps<RootStackParamList, 'Result'>;

type AnswerKeyType = {
  [key: string]: string;
};

type ResultItem = {
  id: string;
  number: number;
  selected: string;
  correct: string;
  status: string;
};

// Sample answer key
const answerKey: AnswerKeyType = {
  q1: 'A',
  q2: 'C',
  q3: 'B',
  q4: 'D',
  q5: 'A',
};

const ResultScreen: React.FC<ResultScreenProps> = ({ route, navigation }) => {
  const { selectedOptions } = route.params;

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;

    const resultData: ResultItem[] = Object.keys(answerKey).map(
      (questionId, index) => {
        const correctAnswer = answerKey[questionId];
        const selectedAnswer = selectedOptions[questionId] || null;

        const isCorrect = selectedAnswer === correctAnswer;
        if (selectedAnswer) {
          isCorrect ? correct++ : incorrect++;
        }

        return {
          id: questionId,
          number: index + 1,
          selected: selectedAnswer || 'Not Answered',
          correct: correctAnswer,
          status: !selectedAnswer
            ? 'Not Answered'
            : isCorrect
            ? 'Correct'
            : 'Incorrect',
        };
      }
    );

    return {
      correct,
      incorrect,
      total: Object.keys(answerKey).length,
      resultData,
    };
  };

  const { correct, incorrect, total, resultData } = calculateResults();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Exam Result</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>✅ Correct: {correct}</Text>
        <Text style={styles.scoreText}>❌ Incorrect: {incorrect}</Text>
        <Text style={styles.scoreText}>📋 Total: {total}</Text>
      </View>

      <Text style={styles.subTitle}>Answer Breakdown:</Text>

      <FlatList
        data={resultData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text style={styles.qNum}>Q{item.number}</Text>
            <Text>Selected: {item.selected}</Text>
            <Text>Correct: {item.correct}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>🏠 Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  scoreBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultCard: {
    backgroundColor: '#eaeaea',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  qNum: {
    fontWeight: '700',
    marginBottom: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
