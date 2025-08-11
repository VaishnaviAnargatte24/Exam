import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ResultScreen = () => {
  const dummyData = [{ id: '1' }]; // Needed for FlatList

  const renderContent = () => (
    <View style={{ flex: 1 }}>
      {/* Profile Image at Top Right */}
      <View style={styles.topRightSection}>
        <Image
          source={require('../../assets/image/candidate.jpg')}
          style={styles.profileImage}
        />
      </View>

      {/* Candidate Info */}
      <View style={styles.card}>
        <Text style={styles.infoText}>Candidate Name: Shruti Rajput</Text>
        <Text style={styles.infoText}>Exam Name: NEET</Text>
        <Text style={styles.infoText}>Subject: Physics</Text>
        <Text style={styles.infoText}>Roll Number: 123456789</Text>
      </View>

      {/* Introduction Message */}
      <Text style={styles.instruction}>
        Thank you for your participation in the NEET Entrance Examination. Below are the details of your Physics Paper performance:
      </Text>

      {/* Time Distribution Range */}
      <View style={styles.timeCard}>
        <Text style={styles.timeTitle}>Time distribution range</Text>
        <Text style={styles.rangeText}>High - 0.5 - 1 Minute</Text>
        <Text style={styles.rangeText}>Medium - 1 - 2 Minute</Text>
        <Text style={styles.rangeText}>Low - 3 - 5 Minute</Text>
      </View>

      {/* Image of Girl */}
      <Image
        source={require('../../assets/image/ResultScreen.png')}
        style={styles.flagGirl}
        resizeMode="contain"
      />

      {/* Color Distribution Bar */}
      <View style={styles.colorBar}>
        <View style={[styles.barSegment, { backgroundColor: '#FF0800' }]} />
        <View style={[styles.barSegment, { backgroundColor: '#FFF821' }]} />
        <View style={[styles.barSegment, { backgroundColor: '#85CC12' }]} />
      </View>

      {/* Horizontal Axis Scale */}
      <View style={styles.scaleRow}>
        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
          <Text key={num} style={styles.scaleText}>{num}</Text>
        ))}
      </View>

      {/* Score Card */}
      <View style={styles.scoreCard}>
        <View style={styles.row}>
          <Text style={styles.scoreText}>Total Questions: 45</Text>
          <Text style={styles.scoreText}>Correct Answers: 25</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.scoreText}>Incorrect Answers: 10</Text>
          <Text style={styles.scoreText}>Total Score: 70</Text>
        </View>
      </View>

      {/* Navigation Options */}
      <View style={styles.linksRow}>
        <TouchableOpacity>
          <Text style={styles.link}>Overall Class Result</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Questions time taken</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Answer Key</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={dummyData}
      keyExtractor={(item) => item.id}
      renderItem={renderContent}
      contentContainerStyle={styles.container}
    />
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  topRightSection: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 4,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 12,
    color: '#444',
  },
  timeCard: {
    backgroundColor: '#FFFC9F91',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  rangeText: {
    fontSize: 14,
    color: '#666',
  },
  flagGirl: {
    width: screenWidth * 0.6,
    height: 160,
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
  colorBar: {
    flexDirection: 'row',
    height: 20,
    marginVertical: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barSegment: {
    flex: 1,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  scaleText: {
    fontSize: 12,
    color: '#555',
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 15,
    marginVertical: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  linksRow: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 12,
  },
  link: {
    color: '#007bff',
    fontSize: 15,
    marginVertical: 4,
    textDecorationLine: 'underline',
  },
});
