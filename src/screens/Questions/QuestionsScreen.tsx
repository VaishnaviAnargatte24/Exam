import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type QuestionsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Questions'>;
};

const questions = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  question: `JEE-style Physics Q${i + 1}: Sample multiple-choice question?`,
  options: [
    `Option A${i + 1}`,
    `Option B${i + 1}`,
    `Option C${i + 1}`,
    `Option D${i + 1}`,
  ],
  correctAnswer: `Option A${i + 1}`,
}));

const totalQuestions = 45;

const QuestionsScreen: React.FC<QuestionsScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [markedReview, _setMarkedReview] = useState<Record<number, boolean>>({});
  const [statusMap, setStatusMap] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);
  const [questionTimer, setQuestionTimer] = useState(50);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const qTimer = setInterval(
      () => setQuestionTimer(prev => (prev > 0 ? prev - 1 : 0)),
      1000,
    );
    return () => clearInterval(qTimer);
  }, []);

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (opt: string) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion.id]: opt });
  };

  const updateStatus = (qid: number, action: string) => {
    setStatusMap(prev => ({ ...prev, [qid]: action }));
  };

  const goToNext = () => {
    updateStatus(currentQuestion.id, 'answered');
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else navigation.navigate('Summary', { selectedOptions, markedReview });
  };

  const handleClear = () => {
    setSelectedOptions(prev => {
      const clone = { ...prev };
      delete clone[currentQuestion.id];
      return clone;
    });
    updateStatus(currentQuestion.id, 'notAnswered');
  };

  const handleSaveMarkReview = () => updateStatus(currentQuestion.id, 'marked');
  const handleMarkReviewNext = () => {
    updateStatus(currentQuestion.id, 'marked');
    goToNext();
  };

  const isOptionSelected = (opt: string) =>
    selectedOptions[currentQuestion.id] === opt;

  const onGridQuestionPress = (index: number) => {
    setCurrentIndex(index);
    setQuestionTimer(50);
    updateStatus(questions[index].id, 'visited');
  };

  const countStatus = (status: string) =>
    Object.values(statusMap).filter(s => s === status).length;
  const notVisitedCount = totalQuestions - Object.keys(statusMap).length;

  const renderStatusBox = (label: string, count: number, color: string) => (
    <View style={styles.statusItem} key={label}>
      <View style={[styles.statusCountBox, { backgroundColor: color }]}>
        <Text style={styles.statusCountText}>{count}</Text>
      </View>
      <Text style={styles.statusLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Header */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.infoText}>Candidate: Shruti Rajput</Text>
          <Text style={styles.infoText}>Exam: JEE</Text>
          <Text style={styles.infoText}>Subject: Physics</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Remaining Time</Text>
            <Text style={styles.timerValue}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
      </View>

      {/* Question Header */}
      <View style={styles.questionHeader}>
        <Text style={styles.questionTitle}>Question {currentIndex + 1}</Text>
        <View style={styles.qTimer}>
          <Text style={styles.qTimerText}>
            {questionTimer.toString().padStart(2, '0')}:00
          </Text>
        </View>
      </View>

      {/* Question */}
      <Text style={styles.questionBody}>{currentQuestion.question}</Text>

      {/* Options */}
      <FlatList
        data={currentQuestion.options}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionSelect(item)}
          >
            <View
              style={[
                styles.radio,
                isOptionSelected(item) && styles.radioSelected,
              ]}
            />
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 4 }}
      />

      {/* Action Buttons (immediately after options, small gap) */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, styles.greenBtn]}
          onPress={goToNext}
        >
          <Text style={styles.btnText}>SAVE & NEXT</Text>
        </TouchableOpacity>

        {/* CLEAR button: white background, black text like image */}
        <TouchableOpacity
          style={[styles.btn, styles.clearBtn]}
          onPress={handleClear}
        >
          <Text style={[styles.clearBtnText]}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, styles.orangeBtn]}
          onPress={handleSaveMarkReview}
        >
          <Text style={styles.btnText}>SAVE & MARK FOR REVIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.blueBtn]}
          onPress={handleMarkReviewNext}
        >
          <Text style={styles.btnText}>MARK FOR REVIEW & NEXT</Text>
        </TouchableOpacity>
      </View>

      {/* NAV AREA: left outlined Back/Next group + right green Submit button */}
      <View style={styles.navContainer}>
        <View style={styles.navLeftBox}>
          <TouchableOpacity
            style={styles.outlinedSmall}
            onPress={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          >
            <Text style={styles.outlinedSmallText}>⟪ BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlinedSmall} onPress={goToNext}>
            <Text style={styles.outlinedSmallText}>NEXT ⟫</Text>
          </TouchableOpacity>
        </View>

        {/* Submit button (visual like image). Using existing handler goToNext to avoid changing navigation logic. */}
        <TouchableOpacity style={styles.submitBtnLarge} onPress={goToNext}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      {/* Legend + Grid */}
      <View style={styles.legendContainer}>
        <View style={styles.legendRow}>
          {renderStatusBox('Not Visited', notVisitedCount, '#e0e0e0')}
          {renderStatusBox(
            'Not Answered',
            countStatus('notAnswered'),
            '#d9534f',
          )}
          {renderStatusBox('Answered', countStatus('answered'), '#5cb85c')}
          {renderStatusBox(
            'Marked for Review',
            countStatus('marked'),
            '#5bc0de',
          )}
        </View>
        <View style={styles.legendRow}>
          {renderStatusBox('Visited', countStatus('visited'), '#007bff')}
        </View>

        <View style={styles.gridContainer}>
          {questions.map((q, i) => {
            let bg = '#eee';
            const st = statusMap[q.id];
            if (st === 'notAnswered') bg = '#d9534f';
            else if (st === 'answered') bg = '#5cb85c';
            else if (st === 'marked') bg = '#5bc0de';
            else if (st === 'visited') bg = '#007bff';
            if (i === currentIndex) bg = '#ff9800';
            return (
              <TouchableOpacity
                key={i}
                style={[styles.gridItem, { backgroundColor: bg }]}
                onPress={() => onGridQuestionPress(i)}
              >
                <Text style={styles.gridText}>
                  {(i + 1).toString().padStart(2, '0')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fafafa',
  },
  infoText: { fontSize: 13, fontWeight: '500' },
  timerContainer: { marginTop: 6 },
  timerLabel: { fontSize: 12, color: '#555' },
  timerValue: { fontSize: 14, fontWeight: '700', color: '#000' },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 6,
    alignItems: 'center',
  },
  questionTitle: { fontSize: 17, fontWeight: '700' },
  qTimer: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
    backgroundColor: '#f2f4f7',
  },
  qTimerText: { fontSize: 13, fontWeight: '600' },
  questionBody: {
    fontSize: 14,
    marginHorizontal: 12,
    marginTop: 10,
    lineHeight: 20,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop: 8,
  },
  optionText: { fontSize: 13, marginLeft: 10 },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#999',
  },
  radioSelected: {
    borderColor: '#007bff',
    backgroundColor: '#007bff',
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 8, // reduced gap so buttons are closer to question (was 12)
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  greenBtn: { backgroundColor: '#28a745' },
  // clear button visuals: white background and border, black text defined below
  clearBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  clearBtnText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '700',
  },
  orangeBtn: { backgroundColor: '#ffc107' },
  blueBtn: { backgroundColor: '#007bff' },

  /* NAV AREA styles */
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f6f7f8',
    borderRadius: 8,
  },
  navLeftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 6,
    backgroundColor: '#fff',
  },
  outlinedSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  outlinedSmallText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 13,
  },
  submitBtnLarge: {
    backgroundColor: '#28a745',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
  },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  /* Legend and Grid */
  legendContainer: { marginTop: 12, marginHorizontal: 12 },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 6,
  },
  statusCountBox: {
    width: 26,
    height: 26,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  statusCountText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  statusLabel: { fontSize: 12 },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  gridItem: {
    width: 40,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  gridText: { fontSize: 12, fontWeight: '600', color: '#000' },
});
