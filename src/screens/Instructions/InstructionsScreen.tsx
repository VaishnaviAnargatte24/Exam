import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import BellIcon from '../assets/bell.svg';
import ProfileIcon from '../../assets/icons/candidate.png';

type RootStackParamList = {
  Instructions: undefined;
  Questions: undefined;
};

type InstructionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Instructions'>;

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ navigation }) => {
  const [agreed, setAgreed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const { width } = useWindowDimensions();

  const handleProceed = () => {
    if (agreed) {
      navigation.navigate('Questions');
    } else {
      Alert.alert('Notice', 'You must agree to the declaration to proceed.');
    }
  };

  const cardWidth = Math.min(width - 20, 1000);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <View style={styles.bellContainer}>
          <View style={styles.notificationDot}><Text style={styles.notifCount}>2</Text></View>
          <BellIcon width={24} height={24} />
        </View>
        <ProfileIcon width={36} height={36} style={styles.profileIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.headerRow}>
            <Text style={styles.cardTitle}>General Instructions</Text>
            <View style={styles.languageContainer}>
              <Text style={styles.languageLabel}>Choose Your Default Language</Text>
              <Picker
                selectedValue={selectedLanguage}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Hindi" value="Hindi" />
              </Picker>
            </View>
          </View>

          <Text style={styles.subHeader}>Please read the instructions carefully</Text>
          <Text style={styles.sectionTitle}>General Instructions:</Text>
          <Text style={styles.instructionText}>1. Total duration of NEET - PHYSICS is 180 min.</Text>
          <Text style={styles.instructionText}>
            2. The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.
          </Text>
          <Text style={styles.instructionText}>
            3. The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
          </Text>

          <View style={styles.statusList}>
            <Text>1. 🟥 You have not visited the question yet.</Text>
            <Text>2. 🔺 You have not answered the question.</Text>
            <Text>3. 🟩 You have answered the question.</Text>
            <Text>4. 🟣 You have NOT answered the question, but have marked the question for review.</Text>
            <Text>5. 🟣✅ The question(s) "Answered and Marked for Review" will be considered for evaluation.</Text>
          </View>

          <Text style={styles.instructionText}>
            4. You can click on the ">" arrow which appears to the left of question palette to collapse the question palette thereby maximizing the question window.
          </Text>
          <Text style={styles.instructionText}>
            5. You can click on your "Profile" image on top right corner of your screen to change the language during the exam for entire question paper.
          </Text>
          <Text style={styles.instructionText}>
            6. You can click on ⬇️ to navigate to the bottom and ⬆️ to navigate to top of the question area, without scrolling.
          </Text>

          <Text style={styles.sectionTitle}>Navigating to a Question:</Text>
          <Text style={styles.instructionText}>7. To answer a question, do the following:</Text>
          <Text style={styles.instructionText}>a. Click on the question number in the Question Palette...</Text>
          <Text style={styles.instructionText}>b. Click on Save & Next to save your answer...</Text>
          <Text style={styles.instructionText}>c. Click on Mark for Review & Next to mark and go to next question.</Text>

          <Text style={styles.sectionTitle}>Answering a Question:</Text>
          <Text style={styles.instructionText}>8. a. To select your answer, click one of the options.</Text>
          <Text style={styles.instructionText}>b. To deselect, click again or click "Clear Response".</Text>
          <Text style={styles.instructionText}>c. To change your answer, click another option.</Text>
          <Text style={styles.instructionText}>d. To save your answer, click Save & Next.</Text>
          <Text style={styles.instructionText}>e. To mark for review, click Mark for Review & Next.</Text>
          <Text style={styles.instructionText}>
            9. To change an already answered question, click and follow the procedure again.
          </Text>

          <Text style={styles.sectionTitle}>Navigating to a Question:</Text>
          <Text style={styles.instructionText}>10. Sections are displayed on the top bar.</Text>
          <Text style={styles.instructionText}>11. After Save & Next, last question goes to next section automatically.</Text>
          <Text style={styles.instructionText}>12. You can shuffle between sections/questions.</Text>
          <Text style={styles.instructionText}>13. Question summary appears above the palette.</Text>

          <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>
            Please note all questions will appear in your default language...
          </Text>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, agreed && styles.checked]}
              onPress={() => setAgreed(!agreed)}
            >
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.declarationText}>
              I have read and understood the instructions. I am not in possession of prohibited gadgets...
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.proceedButton, !agreed && styles.disabledButton]}
            onPress={handleProceed}
            disabled={!agreed}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f2' },
  scrollContainer: { padding: 10, alignItems: 'center' },
  topBar: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bellContainer: { position: 'relative', marginRight: 10 },
  notificationDot: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -6,
    top: -6,
    borderRadius: 8,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  notifCount: { color: '#fff', fontSize: 10 },
  profileIcon: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  languageContainer: { alignItems: 'flex-end' },
  languageLabel: { fontSize: 12, color: '#555', marginBottom: -5 },
  picker: { height: 30, width: 150 },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 15,
    textAlign: 'center',
    color: '#222',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 5,
  },
  statusList: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#555',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: '#4caf50' },
  checkmark: { color: '#fff', fontWeight: 'bold' },
  declarationText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    textAlign: 'justify',
  },
  proceedButton: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: { backgroundColor: '#9e9e9e' },
  proceedButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default InstructionsScreen;
