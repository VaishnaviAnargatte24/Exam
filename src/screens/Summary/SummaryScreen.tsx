import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
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

  const [submitted, setSubmitted] = useState(false);
  
  // State for react-native-dropdown-picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('English');
  const [items, setItems] = useState([
    {label: 'English', value: 'English'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Marathi', value: 'Marathi'},
    {label: 'Tamil', value: 'Tamil'}
  ]);

  const totalQuestions = 45;
  // Calculate the counts based on the state data
  const answered = Object.values(selectedOptions).filter(Boolean).length;
  const notAnswered = Object.keys(selectedOptions).filter(
    (key) => !selectedOptions[key]
  ).length;
  const markedForReview = Object.values(markedReview).filter(Boolean).length;
  const answeredAndMarked = Object.keys(selectedOptions).filter(
    (key) => selectedOptions[key] && markedReview[key]
  ).length;
  const notVisited = totalQuestions - (answered + notAnswered);

  const summaryItems = [
    { label: 'No. of Questions', value: totalQuestions },
    { label: 'Answered', value: answered },
    { label: 'Not Answered', value: notAnswered },
    { label: 'Marked for Review', value: markedForReview },
    { label: 'Answered & Marked for Review', value: answeredAndMarked },
    { label: 'Not Visited', value: notVisited },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      {/* Top Header Section for Profile */}
      <View style={styles.topRightSection}>
        <Image
          // Reverting to the local 'require' call as requested.
          // Note: this may not render correctly in a web preview.
          source={require('../../assets/image/candidate.jpg')}
          style={styles.profileImage}
        />
      </View>
      {/* Profile Top Right */}
<View style={styles.topRightSection}>
  <Image
    source={require('../../assets/image/candidate.jpg')}
    style={styles.profileImage}
  />
</View>

      {/* Main Header Section for Exam Details and Language */}
      <View style={styles.headerBox}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerText}>Candidate Name - Shruti Rajput</Text>
          <Text style={styles.headerText}>Exam Name - NEET</Text>
          <Text style={styles.headerText}>Subject Name - Physics</Text>
          <Text style={styles.timer}>Remaining Time - 02:55:23</Text>
        </View>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.languageDropdown}
            containerStyle={styles.languageContainerStyle}
            dropDownContainerStyle={styles.dropdownMenu}
            labelStyle={styles.languageText}
            textStyle={styles.languageText}
            selectedItemLabelStyle={styles.selectedLanguageText}
            placeholder={value}
            zIndex={1000}
            listMode="SCROLLVIEW"
        />
      </View>

      {/* Conditional Rendering */}
      {!submitted ? (
        <>
          {/* Summary */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Exam Summary</Text>
            <View style={styles.summaryGrid}>
                {summaryItems.map((item, index) => (
                    <View 
                        key={index} 
                        style={[
                            styles.summaryGridItem,
                            index % 3 !== 2 && styles.summaryGridItemRightBorder,
                            index < 3 && styles.summaryGridItemBottomBorder,
                        ]}
                    >
                        <Text style={styles.summaryCellHeader}>{item.label}</Text>
                        <Text style={styles.summaryCellValue}>{item.value}</Text>
                    </View>
                ))}
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
        </>
      ) : (
        <View style={styles.submissionBox}>
          <Image
            // Reverting to the local 'require' call as requested.
            // Note: this may not render correctly in a web preview.
            source={require('../../assets/image/success.png')}
            style={styles.successIcon}
          />
          <Text style={styles.successText}>Thank you, Submitted Successfully.</Text>
          <TouchableOpacity
            style={styles.viewResultButton}
            onPress={() => navigation.navigate('Result', { selectedOptions })}
          >
            <Text style={styles.viewResultText}>VIEW RESULT</Text>
          </TouchableOpacity>
        </View>
      )}
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
    gap: 8,
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
    marginTop: 60,
    marginBottom: 40,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  headerInfo: {
    // This view wraps the header text on the left
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
  languageContainerStyle: {
    width: 100,
    zIndex: 1000,
  },
  languageDropdown: {
    backgroundColor: '#f0f0f0',
    height: 30, // Adjusted height
    paddingVertical: 4, // Adjusted vertical padding
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  languageText: {
    fontSize: 12, // Adjusted font size
  },
  selectedLanguageText: {
    color: '#1f3bb3',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 200, // Adjusted height for dropdown menu
  },
  dropdownItem: {
    fontSize: 13, // Adjusted font size
  },
  summaryBox: {
    backgroundColor: '#e0ffd8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 25,
    zIndex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1, // Add a border around the entire grid
    borderColor: '#000', // Set the border color to black
    backgroundColor: '#f0fff0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  summaryGridItem: {
    width: '33.333%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryGridItemRightBorder: {
    borderRightWidth: 1,
    borderColor: '#000',
  },
  summaryGridItemBottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  summaryCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  summaryCellValue: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4a4a4a',
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
  submissionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  viewResultButton: {
    backgroundColor: '#1f3bb3',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  viewResultText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
});