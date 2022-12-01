import React from "react";
import { View, Image, TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';

const Novedad = ({navigation, ...item}) => {
    return (
      <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetalleNovedad', {
                  titulo: item.value.titulo, 
                  contenido: item.value.contenido,
                  fecha: item.value.fecha,
                  entidadNombre: item.value.entidadNombre,
                  archivosNombres: item.value.archivosnombres,
                  archivosGuardados: item.value.archivosguardados
                });
            }}>
            <View style={styles.cardContainer}>
              <Image style={styles.imageStyle}  source={require('./../assets/img/logoQuilmes.jpg')}/>
              <View style={styles.infoStyle}>
                  
                <Text numberOfLines={1} style={styles.titleStyle}>{item.value.titulo.replace(/<[^>]+>/g, '')}</Text>
                <Text numberOfLines={1} style={styles.contenidoStyle}>{item.value.contenido.replace(/<[^>]+>/g, '')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        )
    };
    
const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 45;
const radius = 20;
  const styles = StyleSheet.create({
    container: {
      width: deviceWidth ,
      alignItems: 'center',
      marginTop: 25,
    },
    cardContainer: {
      width: deviceWidth - offset,
      backgroundColor: '#3b638b',
      height: 200,
      borderRadius: radius,
      shadowColor: '#000',
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 9,
    },
    imageStyle: {
      height: 130,
      width: deviceWidth - offset,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      opacity: 0.9,
      alignContent: 'center',
      alignSelf: 'center',
    },
    titleStyle: {
      fontSize: 20,
      fontWeight: '800',
      color:'#FFF'
    },
    contenidoStyle: {
      fontWeight: '200',
      color:'#FFF',
      
    },
    infoStyle: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
  });

export default Novedad;