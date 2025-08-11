import React, { useState } from 'react';
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
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ExamSelection'>;
};

const { width } = Dimensions.get('window');
const scaleFactor = width / 400;

type DropdownProps = {
  label: string;
  selectedValue: string | null;
  items: { label: string; value: string }[];
  onSelect: (value: string) => void;
};

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  items,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: selectedValue ? '#000' : '#888' }}>
          {selectedValue
            ? items.find(i => i.value === selectedValue)?.label
            : '-Select-'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const ExamSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [exam, setExam] = useState<string | null>(null);
  const [paper, setPaper] = useState<string | null>(null);

  const examItems = [
    { label: 'JEE Main', value: 'jee' },
    { label: 'NEET', value: 'neet' },
  ];

  const paperItems = [
    { label: 'Physics Paper 1', value: 'phy1' },
    { label: 'Maths Paper 2', value: 'math2' },
  ];

  const handleStart = () => {
    if (!exam || !paper) {
      Alert.alert('Validation Error', 'Please select both exam and paper.');
      return;
    }
    navigation.navigate('Instructions');
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
          <CustomDropdown
            label="Select Exam you would like to appear"
            selectedValue={exam}
            items={examItems}
            onSelect={setExam}
          />

          <CustomDropdown
            label="Paper"
            selectedValue={paper}
            items={paperItems}
            onSelect={setPaper}
          />

          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Mock Test</Text>
          </TouchableOpacity>

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

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Welcome to{' '}
            <Text style={styles.highlight}>National Testing Agency</Text>, Test
            practice Centre
          </Text>
          <View style={styles.separator}></View>
          <Text style={styles.description}>
            This Mock Test is to familiarize the students about processes of
            Computer Based Test (CBT), candidate can understand various
            processes of Computer Based Test (CBT) with the available mock test.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B5998',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleFactor * 40,
    paddingHorizontal: scaleFactor * 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: scaleFactor * 20,
    borderRadius: scaleFactor * 10,
    width: '100%',
    maxWidth: 400,
    elevation: 4,
    marginBottom: scaleFactor * 20,
  },
  label: {
    marginBottom: scaleFactor * 10,
    fontSize: scaleFactor * 14,
    color: '#333',
    fontWeight: '600',
  },
  dropdownWrapper: {
    width: '100%',
    marginBottom: scaleFactor * 20,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    minHeight: scaleFactor * 40,
    backgroundColor: '#fff',
    borderRadius: scaleFactor * 5,
    paddingHorizontal: scaleFactor * 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#153D73',
    padding: scaleFactor * 12,
    borderRadius: scaleFactor * 5,
    marginTop: scaleFactor * 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: scaleFactor * 16,
  },
  infoText: {
    fontSize: scaleFactor * 12,
    color: '#777',
    marginTop: scaleFactor * 10,
    textAlign: 'center',
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  footerContainer: {
    width: '100%',
    maxWidth: 400,
    paddingVertical: scaleFactor * 20,
    paddingHorizontal: scaleFactor * 16,
    alignItems: 'center',
    backgroundColor: '#3B5998',
  },
  footerText: {
    color: '#fff',
    fontSize: scaleFactor * 13,
    textAlign: 'center',
    marginBottom: scaleFactor * 10,
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: '#a2a4a9ff',
    marginBottom: scaleFactor * 10,
  },
  highlight: {
    color: '#FBC02D',
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: scaleFactor * 11,
    textAlign: 'center',
    paddingHorizontal: scaleFactor * 20,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: scaleFactor * 8,
    width: '80%',
    maxHeight: '60%',
  },
  modalItem: {
    padding: scaleFactor * 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ExamSelectionScreen;
