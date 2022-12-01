import React from "react";
import { View, Text, StyleSheet } from 'react-native';
    
const EmptyNovedad = () => {
    return (
        <View style={styles.container}>
            <Text>No se encontraron novedades</Text>
        </View>
        )
    };
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default EmptyNovedad;