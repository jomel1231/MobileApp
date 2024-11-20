import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { auth } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/core';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Disable the back button and the header title
  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Removes the header and white space at the top
    });
  }, [navigation]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login'); // Replace with Login screen after logout
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground
      source={require('../assets/BG.jpg')} // Replace with your background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.emailText}>Welcome, {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Make the background image fill the entire screen
    justifyContent: 'center', // Center the content
    alignItems: 'center', // Center the content
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for the background image
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emailText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 30,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
