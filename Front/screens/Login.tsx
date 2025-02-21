import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ButtonGradient from '../components/ButtonGradient';
import { useAuth } from '../context/AuthContex';
import { loginSchema, LoginValues } from '../models/login.model';

const Login = () => {
  const { onLogin } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit:SubmitHandler<LoginValues> = async (data) => {
    console.log(data);
    const result = await onLogin!(data.email, '123456');

    if(result && result.error){
      alert(result.msg)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola</Text>
      <Text style={styles.subTitle}>Ingresa a tu cuenta</Text>
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Correo electrónico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[styles.textInput, styles.textInputEmail]}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Correo electrónico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.textInput}
            secureTextEntry={true}
          />
        )}
      />
      <ButtonGradient onPress={() => handleSubmit(onSubmit)()}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 90,
    color: '#34434D',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20,
    color: 'gray'
  },
  textInput: {
    width: '80%',
    height: 50,
    padding: 10,
    paddingStart: 30,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  textInputEmail: {
    textTransform: 'lowercase'
  }
});

export default Login

