import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ExamSelection'>;
};

const ExamSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [examOpen, setExamOpen] = useState(false);
  const [exam, setExam] = useState<string | null>(null);
  const [examItems, setExamItems] = useState([
    { label: 'JEE Main', value: 'jee' },
    { label: 'NEET', value: 'neet' },
  ]);

  const [paperOpen, setPaperOpen] = useState(false);
  const [paper, setPaper] = useState<string | null>(null);
  const [paperItems, setPaperItems] = useState([
    { label: 'Physics Paper 1', value: 'phy1' },
    { label: 'Maths Paper 2', value: 'math2' },
  ]);

  // Handle dropdown conflicts
  const onExamOpen = useCallback(() => {
    setPaperOpen(false);
  }, []);

  const onPaperOpen = useCallback(() => {
    setExamOpen(false);
  }, []);

  const handleStart = () => {
    if (!exam || !paper) {
      alert('Please select both exam and paper.');
      return;
    }

    // Navigate to Login screen (you can pass exam and paper here if needed)
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.label}>Select Exam you would like to appear</Text>

          <DropDownPicker
            open={examOpen}
            value={exam}
            items={examItems}
            setOpen={setExamOpen}
            setValue={setExam}
            setItems={setExamItems}
            placeholder="Select Exam"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={3000}
            zIndexInverse={1000}
            onOpen={onExamOpen}
          />

          <DropDownPicker
            open={paperOpen}
            value={paper}
            items={paperItems}
            setOpen={setPaperOpen}
            setValue={setPaper}
            setItems={setPaperItems}
            placeholder="Select Paper"
            style={[styles.dropdown, { marginTop: 20 }]}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2000}
            zIndexInverse={2000}
            onOpen={onPaperOpen}
          />

          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Mock Test</Text>
          </TouchableOpacity>

          <Text style={styles.infoText}>
            For NTA Mock Tests till December 2019 onwards, please{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://nta.ac.in')}
            >
              click here
            </Text>
          </Text>
        </View>

        <Text style={styles.footerText}>
          Welcome to <Text style={styles.highlight}>National Testing Agency</Text>, Test practice Centre
        </Text>

        <Text style={styles.description}>
          This Mock Test is to familiarize students about the process of Computer Based Test (CBT)
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#153D73',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    elevation: 4,
    zIndex: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    borderColor: '#ccc',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#153D73',
    padding: 12,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 12,
    color: '#777',
    marginTop: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  footerText: {
    color: '#fff',
    marginTop: 40,
    fontSize: 13,
  },
  highlight: {
    color: '#fbc02d',
  },
  description: {
    color: '#fff',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ExamSelectionScreen;
