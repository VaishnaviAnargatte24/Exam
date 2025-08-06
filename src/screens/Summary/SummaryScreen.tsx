import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// 👇 Define the type for the selected options
type SelectedOptions = {
  [questionId: string]: string;
};

type MarkedReview = {
  [questionId: string]: boolean;
};

// 👇 Define navigation + route props
type RootStackParamList = {
  Summary: {
    selectedOptions: SelectedOptions;
    markedReview: MarkedReview;
  };
  Result: {
    selectedOptions: SelectedOptions;
  };
};

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'Summary'>;
type SummaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Summary'
>;

type Props = {
  route: SummaryScreenRouteProp;
  navigation: SummaryScreenNavigationProp;
};

const SummaryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { selectedOptions, markedReview } = route.params;

  const data = Object.keys(selectedOptions).map((questionId, index) => ({
    id: questionId,
    questionNumber: index + 1,
    answer: selectedOptions[questionId],
    review: markedReview[questionId] || false,
  }));

  const handleSubmit = () => {
    navigation.navigate('Result', {
      selectedOptions,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Summary</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.questionNum}>Question {item.questionNumber}</Text>
            <Text style={styles.answer}>
              Answer: {item.answer || 'Not Answered'}
            </Text>
            {item.review && (
              <Text style={styles.review}>Marked for Review</Text>
            )}
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>⬅ Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.footerText}>✅ Submit Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  questionNum: {
    fontWeight: '600',
    marginBottom: 4,
  },
  answer: {
    fontSize: 15,
    color: '#333',
  },
  review: {
    marginTop: 4,
    fontSize: 13,
    color: '#ff9900',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  goBackBtn: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  submitBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  footerText: {
    color: '#fff',
    fontWeight: '600',
  },
});
