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
  Alert,
  Dimensions, // <-- Import Dimensions for responsive styling
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Define the Props type for the component, specifying the navigation prop.
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ExamSelection'>;
};

// Get the screen dimensions to use for responsive styling.
const { width } = Dimensions.get('window');

// Define a scaling factor for font sizes and padding based on screen width.
const scaleFactor = width / 400; // Assuming a base width of 400 for a typical phone.

const ExamSelectionScreen: React.FC<Props> = ({ navigation }) => {
  // State for the first dropdown (Exam)
  const [examOpen, setExamOpen] = useState(false);
  const [exam, setExam] = useState<string | null>(null);
  const [examItems, setExamItems] = useState([
    { label: 'JEE Main', value: 'jee' },
    { label: 'NEET', value: 'neet' },
  ]);

  // State for the second dropdown (Paper)
  const [paperOpen, setPaperOpen] = useState(false);
  const [paper, setPaper] = useState<string | null>(null);
  const [paperItems, setPaperItems] = useState([
    { label: 'Physics Paper 1', value: 'phy1' },
    { label: 'Maths Paper 2', value: 'math2' },
  ]);

  // Callback to close the second dropdown when the first one opens, to prevent overlap.
  const onExamOpen = useCallback(() => {
    setPaperOpen(false);
  }, []);

  // Callback to close the first dropdown when the second one opens, to prevent overlap.
  const onPaperOpen = useCallback(() => {
    setExamOpen(false);
  }, []);

  // Function to handle the "Start Mock Test" button press.
  const handleStart = () => {
    // Check if both dropdowns have a selected value.
    if (!exam || !paper) {
      // Use the native Alert API for React Native to show a warning.
      Alert.alert('Validation Error', 'Please select both exam and paper.');
      return;
    }

    // Navigate to the 'Login' screen upon successful selection.
    // This assumes the navigation stack is correctly set up.
    navigation.navigate('Login');
  };

  return (
    // KeyboardAvoidingView ensures the content moves up when the keyboard appears.
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ScrollView allows the content to be scrollable if it exceeds screen height. */}
      {/* The contentContainerStyle is for styling the inner content wrapper of the ScrollView. */}
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* The main white card containing the dropdowns and button. */}
        <View style={styles.card}>
          <Text style={styles.label}>Select Exam you would like to appear</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={examOpen}
              value={exam}
              items={examItems}
              setOpen={setExamOpen}
              setValue={setExam}
              setItems={setExamItems}
              placeholder="-Select-"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={3000}
              zIndexInverse={1000}
              onOpen={onExamOpen}
            />
          </View>

          <Text style={[styles.label, { marginTop: scaleFactor * 20 }]}>Paper</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={paperOpen}
              value={paper}
              items={paperItems}
              setOpen={setPaperOpen}
              setValue={setPaper}
              setItems={setPaperItems}
              placeholder="-Select-"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={2000}
              zIndexInverse={2000}
              onOpen={onPaperOpen}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Mock Test</Text>
          </TouchableOpacity>

          {/* Text with an external link */}
          <Text style={styles.infoText}>
            For NTA Mock Tests of December 2018 onwards, please{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://nta.ac.in')}
            >
              click here
            </Text>
          </Text>
        </View>

        {/* Footer Section with Line */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Welcome to <Text style={styles.highlight}>National Testing Agency</Text>, Test practice Centre
          </Text>
          <View style={styles.separator}></View>
          <Text style={styles.description}>
            This Mock Test is to familiarize the students about processes of Computer Based Test (CBT), candidate can
            understand various processes of Computer Based Test (CBT) with the available mock test.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// StyleSheet for the component's styles.
const styles = StyleSheet.create({
  // The main container for the entire screen, with a blue background.
  container: {
    backgroundColor: '#3B5998',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleFactor * 40,
    paddingHorizontal: scaleFactor * 16,
  },
  // The white card that holds the form elements.
  card: {
    backgroundColor: '#fff',
    padding: scaleFactor * 20,
    borderRadius: scaleFactor * 10,
    width: '100%',
    maxWidth: 400,
    elevation: 4,
    zIndex: 10,
    marginBottom: scaleFactor * 20,
  },
  // Style for the text labels above the dropdowns.
  label: {
    marginBottom: scaleFactor * 10,
    fontSize: scaleFactor * 14,
    color: '#333',
    fontWeight: '600',
  },
  // Wrapper for the dropdown to manage its width.
  dropdownWrapper: {
    width: '100%',
  },
  // Style for the dropdown picker itself.
  dropdown: {
    borderColor: '#ccc',
    minHeight: scaleFactor * 40,
    backgroundColor: '#fff',
    borderRadius: scaleFactor * 5,
    paddingHorizontal: scaleFactor * 10,
  },
  // Style for the dropdown's container when it's open.
  dropdownContainer: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: scaleFactor * 5,
  },
  // Style for the "Start Mock Test" button.
  button: {
    backgroundColor: '#153D73',
    padding: scaleFactor * 12,
    borderRadius: scaleFactor * 5,
    marginTop: scaleFactor * 30,
  },
  // Style for the text inside the button.
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: scaleFactor * 16,
  },
  // Style for the small info text below the button.
  infoText: {
    fontSize: scaleFactor * 12,
    color: '#777',
    marginTop: scaleFactor * 10,
    textAlign: 'center',
  },
  // Style for the clickable link text.
  link: {
    color: '#007BFF', 
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  // Container for the footer section.
  footerContainer: {
    width: '100%',
    maxWidth: 400,
    paddingVertical: scaleFactor * 20,
    paddingHorizontal: scaleFactor * 16,
    alignItems: 'center',
    backgroundColor: '#3B5998',
  },
  // Style for the footer's main text.
  footerText: {
    color: '#fff',
    fontSize: scaleFactor * 13,
    textAlign: 'center',
    marginBottom: scaleFactor * 10,
  },
  // The horizontal separator line in the footer.
  separator: {
    height: 1,
    width: '90%', // Wider line
    backgroundColor: '#a2a4a9ff',
    marginBottom: scaleFactor * 10,
  },
  // Highlighted text style for "National Testing Agency".
  highlight: {
    color: '#FBC02D', // New yellow color
    fontWeight: 'bold',
  },
  // Description text in the footer.
  description: {
    color: '#fff',
    fontSize: scaleFactor * 11,
    textAlign: 'center',
    paddingHorizontal: scaleFactor * 20,
    width: '100%',
  },
});

export default ExamSelectionScreen;