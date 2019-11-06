import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  Button
} from "react-native";
import { KeyboardAvoidingView } from "react-native";

export default class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    confirmationPassword: ""
  };
  //handles state change key val pair
  handleChange = key => val => {
    this.setState({ [key]: val });
  };
  componentWillMount() {
    //get user data
  }
  //submit form class for log in
  submitForm = () => {
    if(this.state.password == this.state.confirmationPassword){
    
    }else{
        Alert.alert('Passwords do not match');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <TextInput //Email input box
            placeholder="Enter An Email: "
            placeholderTextColor="rgba(255,255,255,0.6)"
            returnKeyType="next"
            keyboardType="email-address"
            style={styles.input}
            value={this.state.email}
            onChangeText={this.handleChange("email")}
          />
          <TextInput //Password input box
            placeholder="Create A Password: "
            placeholderTextColor="rgba(255,255,255,0.6)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            value={this.state.password}
            onChangeText={this.handleChange("password")}
          />
          <TextInput //Password input box
            placeholder="Confirm Password: "
            placeholderTextColor="rgba(255,255,255,0.6)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            value={this.state.confirmationPassword}as
            onChangeText={this.handleChange("confirmationPassword")}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.buttonSignup}
          >
          
              
            <Text style={styles.buttonText}>Continue To Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

//styling for form

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  buttonLogin: {
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#D4AF37",
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#D4AF37",
    borderWidth: 1
  },
  buttonSignup: {
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#21B452",
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#21B452",
    borderWidth: 1
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700"
  }
});