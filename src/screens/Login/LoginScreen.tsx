import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

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
    navigation.navigate('Instructions');
  };

  return (
    <View style={styles.container}>
      {/* Top Info */}
      <View style={styles.topInfo}>
        <View>
          <Text style={styles.systemName}>System Name - [ C0001 ]</Text>
          <Text style={styles.warning}>
            [ Contact Invigilator if the Name and Photograph displayed on the screen is not yours ]
          </Text>
        </View>

        <View style={styles.candidateBox}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // replace with real image if needed
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.candidateName}>Candidate Name - Shruti Rajput</Text>
            <Text style={styles.subject}>Subject - Practice Paper 1</Text>
          </View>
        </View>
      </View>

      {/* Login Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.proceedNote}>Click Login to Proceed</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Welcome to <Text style={styles.footerHighlight}>National Testing Agency</Text>, Test practice Centre
      </Text>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23407c',
    padding: 16,
    alignItems: 'center',
  },
  topInfo: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  systemName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  warning: {
    color: '#f57c00',
    fontSize: 12,
  },
  candidateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  candidateName: {
    fontWeight: '600',
  },
  subject: {
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'stretch',
    maxWidth: 400,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#23407c',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
  },
  proceedNote: {
    color: '#f57c00',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
  },
  footer: {
    color: '#fff',
    marginTop: 30,
    fontSize: 13,
    textAlign: 'center',
  },
  footerHighlight: {
    color: '#fbc02d',
  },
});
