import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/core";
import { MaterialIcons } from "@expo/vector-icons"; // Import icon library

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email && password) {
      auth.signInWithEmailAndPassword(email, password)
        .then((userCreds) => {
          navigation.replace("Home");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please fill in both email and password fields.");
    }
  };

  const isEmailValid = email.includes("@"); // Simple email validation

  return (
    <ImageBackground
      source={require("../assets/BG.jpg")} // Replace with your background image
      style={styles.background}
    >
      {/* Add greenish overlay */}
      <View style={styles.overlay} />

      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="email"
              size={20}
              color="white"
              style={styles.icon}
            />
            <TextInput
              placeholder={"Email"}
              placeholderTextColor={"#ccc"}
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {isEmailValid && (
              <MaterialIcons name="check-circle" size={20} color="green" />
            )}
          </View>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock"
              size={20}
              color="white"
              style={styles.icon}
            />
            <TextInput
              placeholder={"Password"}
              placeholderTextColor={"#ccc"}
              style={styles.input}
              value={password}
              onChangeText={(pwd) => setPassword(pwd)}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              <MaterialIcons
                name={isPasswordVisible ? "visibility-off" : "visibility"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUp}>Don't have an account yet? </Text>
          <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: "rgba(0, 50, 50, 0.6)", // Greenish overlay
  },
  container: {
    width: "80%",
    marginTop: 50,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 15,
    position: "relative",
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    padding: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  forgotPassword: {
    color: "#fff",
    alignSelf: "flex-end",
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signUp: {
    color: "white",
    fontSize: 16,
  },
  signUpLink: {
    color: "#6C63FF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
