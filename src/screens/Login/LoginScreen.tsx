import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  
import { RootStackParamList } from '../../navigation/AppNavigator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    navigation.navigate('ExamSelection');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <View style={styles.container}>
        {/* === Header Box === */}
        <View style={styles.topHeaderBox}>
          <View style={styles.systemInfoContainer}>
            <Text style={styles.systemName}>
              System Name - <Text style={styles.systemCode}>[ C0001 ]</Text>
            </Text>
            <Text style={styles.alertMessage}>
              [ Contact Invigilator if the Name and Photograph displayed on the
              screen is not yours ]
            </Text>
          </View>

          <View style={styles.candidateContainer}>
            <Image
              source={require('../../assets/image/candidate.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}>
                <Text style={{ fontWeight: 'bold' }}>Candidate Name - </Text>
                Shruti Rajput
              </Text>
              <Text style={styles.profileText}>
                <Text style={{ fontWeight: 'bold' }}>Subject - </Text>
                Practice Paper 1
              </Text>
            </View>
          </View>
        </View>

        {/* === Main Section === */}
        <View style={styles.blueSection}>
          <View style={styles.loginCard}>
            <Text style={styles.cardTitle}>Login</Text>
            <View style={styles.divider} />

            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#000"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#000"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.proceedNote}>Click Login to Proceed</Text>
          </View>

          <View style={styles.footerLine} />
          <Text style={styles.footerText}>
            Welcome to{' '}
            <Text style={styles.footerHighlight}>National Testing Agency</Text>,
            Test Practice Centre
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: width * 0.03,
  },
  topHeaderBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
    padding: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  systemInfoContainer: {
    marginBottom: 10,
  },
  systemName: {
    fontSize: width * 0.032,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  systemCode: {
    color: '#f57c00',
    fontWeight: '600',
  },
  alertMessage: {
    fontSize: width * 0.03,
    color: '#f57c00',
  },
  candidateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  profileImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    marginRight: 10,
  },
  profileDetails: {
    flexShrink: 1,
    maxWidth: width * 0.6,
  },
  profileText: {
    fontSize: width * 0.032,
    color: '#000',
  },
  blueSection: {
    backgroundColor: '#2f4ea1',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    width: '100%',
    maxWidth: 420,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#2f4ea1',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  proceedNote: {
    color: '#f57c00',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 10,
  },
  footerLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '90%',
    marginTop: 40,
    marginBottom: 16,
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  footerHighlight: {
    color: '#fbc02d',
    fontWeight: 'bold',
  },
});
