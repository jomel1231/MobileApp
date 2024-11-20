import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/BG.jpg')} // Replace with your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>FIXPERT</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 50, 50, 0.6)', // Adjust for green overlay effect
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Add subtle text shadow for clarity
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: '#ffffff',
    width: '70%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: '#ffffff',
    borderWidth: 2,
    width: '70%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
  },
});
