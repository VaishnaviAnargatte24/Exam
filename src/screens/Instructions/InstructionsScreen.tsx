import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const InstructionsScreen = ({ navigation }) => {
  const handleProceed = () => {
    navigation.navigate('Questions');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Please read the instructions carefully</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>General Instructions:</Text>
        <Text style={styles.text}>1. Total duration of this exam is 3 Hours.</Text>
        <Text style={styles.text}>2. Questions will appear one by one.</Text>
        <Text style={styles.text}>3. All questions are compulsory unless marked optional.</Text>
      </View>

      <View style={styles.colorLegend}>
        <Text style={styles.colorText}>⬛ You have not visited the question yet.</Text>
        <Text style={styles.colorText}>🔴 You have not answered the question.</Text>
        <Text style={styles.colorText}>🟢 You have answered the question.</Text>
        <Text style={styles.colorText}>🟡 Marked for review.</Text>
      </View>

      <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginVertical: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 22,
  },
  colorLegend: {
    marginTop: 20,
  },
  colorText: {
    marginBottom: 8,
    fontSize: 14,
  },
  proceedButton: {
    marginTop: 30,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InstructionsScreen;
