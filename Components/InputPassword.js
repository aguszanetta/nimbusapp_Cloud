import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputPassword = ({password, hidePassword, onChangeText, onPress}) => {
    return (
      <View style={{width:'80%'}}>
        <TextInput
            style={styles.TextInput}
            placeholder='Contraseña'
            secureTextEntry={hidePassword}
            keyboardType="numeric"
            value={password}
            {...onChangeText} 
            />
        <View style={styles.leftIcon}>
            <Icon name="lock" color={'gray'} size={25}/>
        </View>
        <TouchableOpacity 
        {...onPress} 
        style={styles.rightIcon} 
        >
            <Icon name={hidePassword ? 'eye-off' : 'eye'} color={'gray'} size={25}/>
        </TouchableOpacity>
        </View>
    );
  }

const styles = StyleSheet.create({
    TextInput: {
      backgroundColor: '#FFF',
      paddingStart: 55,
      borderRadius: 30,
      fontSize: 16,
      height: 60,
      marginVertical: 3,
      marginBottom: 10,
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
    }
  });

export default InputPassword;