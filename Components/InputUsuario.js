import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputUsuario = ({usuario, onChangeText}) => {
    return (
      <View style={{width:'80%'}}>
        <TextInput
            style={styles.TextInput}
            placeholder='Usuario'
            keyboardType="numeric"
            value={usuario}
            {...onChangeText}
             />
        <View style={styles.leftIcon}>
          <Icon name="account" color={'gray'} size={25}/>
        </View>
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
    }
  });

export default InputUsuario;