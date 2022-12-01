import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componenetes
import KeyboardAvoidingWrapper from "./../Components/KeyboardAvoidingWrapper";
import ImagenLogin from "./../Components/ImagenLogin";
import InputUsuario from '../Components/InputUsuario';
import InputPassword from '../Components/InputPassword';
import BtnLogin from '../Components/BtnLogin';

// API client
import axios from "axios";

const Login = ({navigation}) => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  const [hidePassword, setHidePassword] = useState(true);
  const [mensajeError, setMensajeError] = useState();
  const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
    const firstLoad = async () => {
      try {
        const credenciales = await AsyncStorage.getItem("medico");
        if(credenciales != null){
          data = JSON.parse(credenciales)
          navigation.navigate("DrawerNavigator", {...data})
        }
      } catch (err) {
        console.log(err);
      }
    };
    firstLoad();
    }, []);

  const submit = ()=>{
    if(usuario == '' || password == ''){
      setMensajeError('Por favor complete todos los campos')
      setSubmitting(false)
    }else{
        const url = 'http://myIP/Nimbus%20Salud%203.3/endpoint-mobileV2.php'
        axios
          .post(url, {
              opcion: 1,
              usuario: usuario,
              password: password
          })  
          .then(async(response) => {
              const result = response.data;
              const { message, status, data } = result;
              
              if(status !== 'SUCCESS'){
                setMensajeError(message)
              }else{
                await AsyncStorage.setItem('medico', JSON.stringify(data))
                .catch(error => {
                console.log(error)
                })
                  navigation.navigate("DrawerNavigator", {...data})
              }
              setSubmitting(false)
          })
          .catch(error => {
              console.log(error)
              setSubmitting(false)
              setMensajeError("An error ocurred. Check your network and try again")
          })
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.mainContainer}>
        
      <ImagenLogin />

        <View style={styles.container}>  
          <Text style={styles.titulo}>Hola</Text>
          <Text style={styles.subtitulo}>Inicie sesión para continuar</Text>
          
          <InputUsuario 
            value = {usuario}
            onChangeText = {{
              onChangeText: (value) => {
                setUsuario(value);
                setMensajeError("");
              }
            }}
          />
          
          <InputPassword 
            value = {password}
            hidePassword = {hidePassword}
            onChangeText = {{
              onChangeText: (value) => {
                setPassword(value);
                setMensajeError("");
              }
            }}
            onPress = {{
              onPress: () => setHidePassword(!hidePassword)
            }}
          />

          <Text style={styles.mensaje}>{mensajeError}</Text>

          <BtnLogin
            isSubmitting = {isSubmitting}
            onPress = {{
              onPress:() => { 
                setSubmitting(true);
                submit()
              }
            }}
          />

          <View style={styles.container}>

          </View>
            <StatusBar backgroundColor='#22657A' style="light" />
          </View>
      </View>
    </KeyboardAvoidingWrapper>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F1F1F1',
  },
  container: {
    backgroundColor: '#F1F1F1',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 80,
    color: '#34434D',
    fontWeight: 'bold'
  },
  subtitulo: {
    fontSize: 20,
    marginBottom: 20,
    color: 'gray'
  },
  mensaje: {
    fontSize: 13,
    color: 'red'
  }
});

export default Login;