import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const totalQuestions = 45;

const questions = Array.from({ length: totalQuestions }).map((_, index) => ({
  id: index + 1,
  question: `Question ${index + 1}: What is the capital of India?`,
  options: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata'],
  correctAnswer: 'Delhi',
}));

const QuestionsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [markedReview, setMarkedReview] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours
  const [submitted, setSubmitted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev => ({ ...prev, [currentQuestion.id]: option }));
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setSubmitted(false);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleReview = () => {
    setMarkedReview(prev => ({ ...prev, [currentQuestion.id]: true }));
    handleNext();
  };

  const handleClear = () => {
    setSelectedOptions(prev => {
      const updated = { ...prev };
      delete updated[currentQuestion.id];
      return updated;
    });
  };

  const getStatusColor = (index: number) => {
    const id = index + 1;
    if (selectedOptions[id]) return markedReview[id] ? '#9333ea' : '#22c55e';
    if (markedReview[id]) return '#facc15';
    return '#d1d5db'; // Not Visited
  };

  const currentQuestion = questions[currentIndex];

  const getStatusCounts = () => {
    let answered = 0;
    let notAnswered = 0;
    let markedForReview = 0;

    for (let i = 1; i <= totalQuestions; i++) {
      if (selectedOptions[i]) {
        answered++;
        if (markedReview[i]) {
          markedForReview++;
        }
      } else {
        notAnswered++;
      }
    }

    return { answered, notAnswered, markedForReview };
  };

  const { answered, notAnswered, markedForReview } = getStatusCounts();

  return (
    <ScrollView style={styles.container}>
      {/* Top Info Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topText}>
            <Text style={styles.boldText}>Candidate Name - </Text> Shruti Rajput
          </Text>
          <Text style={styles.topText}>
            <Text style={styles.boldText}>Exam Name - </Text> JEE
          </Text>
          <Text style={styles.topText}>
            <Text style={styles.boldText}>Subject Name - </Text> Physics
          </Text>
          <Text style={styles.topText}>
            <Text style={styles.boldText}>Remaining Time - </Text>
            <Text style={styles.timerBox}>{formatTime(timeLeft)}</Text>
          </Text>
        </View>
        <View style={styles.languageBox}>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={itemValue => setSelectedLanguage(itemValue)}
              style={styles.picker}
              dropdownIconColor="#000"
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hindi" value="Hindi" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Status Summary */}
      <View style={styles.statusSummary}>
        <Text style={styles.statusCount}>
          {totalQuestions - notAnswered} Answered
        </Text>
        <Text style={styles.statusCount}>{notAnswered} Not Answered</Text>
        <Text style={styles.statusCount}>
          {markedForReview} Marked for Review
        </Text>
        <Text style={styles.statusCount}>
          {markedForReview} Answered & Marked for Review
        </Text>
      </View>

      {!submitted ? (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Question {currentQuestion.id}</Text>
          </View>

          {/* Question */}
          <Text style={styles.question}>{currentQuestion.question}</Text>

          {/* Options */}
          {currentQuestion.options.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                selectedOptions[currentQuestion.id] === option &&
                  styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonGreen} onPress={handleNext}>
              <Text style={styles.buttonText}>SAVE & NEXT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonGray} onPress={handleClear}>
              <Text style={styles.buttonText}>CLEAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonOrange}
              onPress={handleReview}
            >
              <Text style={styles.buttonText}>SAVE & MARK FOR REVIEW</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBlue} onPress={handleReview}>
              <Text style={styles.buttonText}>MARK FOR REVIEW & NEXT</Text>
            </TouchableOpacity>
          </View>

          {/* Question Navigator */}
          <View style={styles.navigator}>
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.navButton,
                  { backgroundColor: getStatusColor(index) },
                ]}
                onPress={() => goToQuestion(index)}
              >
                <Text style={styles.navText}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => setSubmitted(true)}
          >
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.submittedView}>
          <Text style={styles.submitText}>
            🎉 You have completed Question 45!
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            Thank you for attempting the quiz.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  topBar: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#111827',
  },
  boldText: {
    fontWeight: '600',
    color: '#000',
  },
  languageBox: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dropdownContainer: {
    backgroundColor: '#f1f5f9', // Background color like the image
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    elevation: 2, // Optional shadow for Android
  },
  picker: {
    height: 40,
    width: 120,
    color: '#000', // Set font color
  },
  pickerItem: {
    height: 40,
  },
  timerBox: {
    backgroundColor: '#e0e7ff',
    color: '#1e3a8a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  headerText: { fontSize: 20, fontWeight: '600' },
  question: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 14,
    color: '#111827',
  },
  option: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#e0f2fe',
    borderColor: '#3b82f6',
  },
  footer: { marginVertical: 16 },
  buttonGreen: {
    backgroundColor: '#22c55e',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonGray: {
    backgroundColor: '#6b7280',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonOrange: {
    backgroundColor: '#f59e0b',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonBlue: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  navigator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    marginTop: 20,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: { color: '#000', fontSize: 12, fontWeight: '600' },
  submitButton: {
    backgroundColor: '#16a34a',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  submittedView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    marginTop: 50,
  },
  statusSummary: {
    marginVertical: 16,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  statusCount: {
    fontSize: 14,
    marginBottom: 4,
    color: '#111827',
  },
});
