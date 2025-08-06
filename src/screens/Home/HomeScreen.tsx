import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const HomeScreen = () => {
  const [examOpen, setExamOpen] = useState(false);
  const [exam, setExam] = useState(null);
  const [examItems, setExamItems] = useState([
    { label: 'JEE Main', value: 'jee' },
    { label: 'NEET', value: 'neet' },
  ]);

  const [paperOpen, setPaperOpen] = useState(false);
  const [paper, setPaper] = useState(null);
  const [paperItems, setPaperItems] = useState([
    { label: 'Physics Paper 1', value: 'phy1' },
    { label: 'Maths Paper 2', value: 'math2' },
  ]);

  return (
    <View style={styles.container}>
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
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Mock Test</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          For NTA Mock Tests till December 2019 onwards, please <Text style={styles.link}>click here</Text>
        </Text>
      </View>

      <Text style={styles.footerText}>
        Welcome to <Text style={styles.highlight}>National Testing Agency</Text>, Test practice Centre
      </Text>

      <Text style={styles.description}>
        This Mock Test is to familiarize students about the process of Computer Based Test (CBT)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#153D73',
    flex: 1,
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
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
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

export default HomeScreen;
