import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BtnLogin = ({onPress, isSubmitting}) => {
    return (
      <TouchableOpacity  
            style={styles.containerBtn}
            {...onPress}
           >
            <LinearGradient
              style={styles.button}
              colors={['#2694BD', '#3273A9']}
              start={{x:1, y:0}}
              end={{x:0, y:1}}>
              {(isSubmitting) ? <ActivityIndicator size="large" color="#fff"/> : 
              <Text style={styles.text}>Conectar</Text>
              }
            </LinearGradient>
          </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#F1F1F1',
      
    },
    containerImg: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: 400,
      height:  285,
    },
    img: {
      width: '100%',
      height: '100%',
      resizeMode: "cover"
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
    TextInput: {
      backgroundColor: '#FFF',
      paddingStart: 55,
      borderRadius: 30,
      fontSize: 16,
      height: 60,
      marginVertical: 3,
      marginBottom: 10,
    },
    containerBtn: {
      flex: 1,
      alignItems: 'center',
      width: '60%',
      marginTop: 80
    }, 
    text: {
      fontSize: 14,
      color: '#FFF',
      fontWeight: 'bold'
    },
    button: {
      width: '80%',
      height: 50,
      borderRadius: 25,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    leftIcon: {
      left: 15,
      top: 20,
      position: 'absolute',
      zindex: 1,
    },
    rightIcon: {
      right: 20,
      top: 20,
      position: 'absolute',
      zindex: 1,
    },
    mensaje: {
      fontSize: 13,
      color: 'red'
    }
  });

export default BtnLogin;