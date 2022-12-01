import React from "react";

import { View, Image, StyleSheet  } from 'react-native';

const ImagenLogin = () => {
    return (
        <View style={styles.containerImg}>
        <Image
            source={require('../assets/img/lg2.png')}
            style={styles.img}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
  });

export default ImagenLogin;