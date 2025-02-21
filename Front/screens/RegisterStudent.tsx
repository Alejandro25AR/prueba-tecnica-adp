import React from "react";
import { 
  Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard 
} from "react-native";

const RegisterStudent = () => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.title}>Registrar estudiante</Text>

          <Text style={styles.label}>Nombre</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nombre" 
          />

          <Text style={styles.label}>Identificación</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Identificación" 
            keyboardType="numeric"
          />

          <Text style={styles.label}>Grado</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Grado" 
          />

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            keyboardType="email-address"
          />

          <Text style={styles.label}>Género</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Género" 
          />

          <Text style={styles.label}>Sexo biológico</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Sexo biológico" 
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  form: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  }
});

export default RegisterStudent;
