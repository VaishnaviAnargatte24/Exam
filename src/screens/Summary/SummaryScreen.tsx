import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

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

  const totalQuestions = 45;
  const answered = Object.values(selectedOptions).filter(Boolean).length;
  const markedForReview = Object.values(markedReview).filter(Boolean).length;
  const answeredAndMarked = Object.keys(selectedOptions).filter(
    (key) => selectedOptions[key] && markedReview[key]
  ).length;
  const notAnswered = Object.keys(selectedOptions).filter(
    (key) => !selectedOptions[key]
  ).length;
  const notVisited = totalQuestions - Object.keys(selectedOptions).length;

  const handleSubmit = () => {
    navigation.navigate('Result', {
      selectedOptions,
    });
  };

  return (
    <View style={styles.container}>
      {/* Profile Top Right */}
      <View style={styles.topRightSection}>
        <Image
          source={require('../../assets/image/candidate.jpg')}
          style={styles.profileImage}
        />
      </View>

      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Candidate Name - Shruti Rajput</Text>
        <Text style={styles.headerText}>Exam Name - NEET</Text>
        <Text style={styles.headerText}>Subject Name - Physics</Text>
        <Text style={styles.timer}>Remaining Time - 02:55:23</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Exam Summary</Text>

        <View style={styles.row}>
          <View style={styles.cell}><Text>No. of Questions{"\n"}{totalQuestions}</Text></View>
          <View style={styles.cell}><Text>Answered{"\n"}{answered}</Text></View>
          <View style={styles.cell}><Text>Not Answered{"\n"}{notAnswered}</Text></View>
          <View style={styles.cell}><Text>Marked for Review{"\n"}{markedForReview}</Text></View>
          <View style={styles.cell}><Text>Answered & Marked for Review{"\n"}{answeredAndMarked}</Text></View>
          <View style={styles.cell}><Text>Not Visited{"\n"}{notVisited}</Text></View>
        </View>
      </View>

      {/* Confirm Text */}
      <Text style={styles.confirmText}>
        Are you sure you want to submit for final marking?{"\n"}
        No changes will be allowed after submission.
      </Text>

      {/* Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.yesButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>NO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 16,
  },
  topRightSection: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },

  headerBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 40,
    elevation: 2,
  },
  headerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  timer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  summaryBox: {
    backgroundColor: '#e0ffd8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 25,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cell: {
    width: '30%',
    marginVertical: 8,
    textAlign: 'center',
    alignItems: 'center',
  },
  confirmText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  yesButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  noButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
