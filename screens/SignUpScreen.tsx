import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { auth } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons'; // Import icon library

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        console.log('Registered with:', user.email);

        // Show a pop-up message
        Alert.alert('Success', 'Account Created!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'), // Redirect to Login screen after OK
          },
        ]);
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  const isEmailValid = email.includes('@'); // Simple email validation

  return (
    <ImageBackground source={require('../assets/BG.jpg')} style={styles.background}>
      {/* Add greenish overlay */}
      <View style={styles.overlay} />

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Create Your Account</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={20} color="white" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {isEmailValid && <MaterialIcons name="check-circle" size={20} color="green" />}
          </View>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="badge" size={20} color="white" style={styles.icon} />
            <TextInput
              placeholder="ID Number"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={id}
              onChangeText={(text) => setId(text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={20} color="white" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
              <MaterialIcons
                name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={20} color="white" style={styles.icon} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <MaterialIcons
                name={isConfirmPasswordVisible ? 'visibility-off' : 'visibility'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(0, 50, 50, 0.6)', // Greenish overlay
  },
  container: {
    width: '80%',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#6C63FF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
