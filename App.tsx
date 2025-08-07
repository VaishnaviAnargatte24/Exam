import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
