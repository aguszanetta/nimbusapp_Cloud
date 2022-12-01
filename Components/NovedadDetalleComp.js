import React from "react";
import { View, ScrollView, Text, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const NovedadDetalleComp = ({value}) => {
    const { width } = useWindowDimensions();
    
    const visualizarPDF = async (value)  => {
      Linking.openURL('http://nimbussalud.com.ar/files/' + value);
    }

    const arrayArchivos = []

    if (value.archivosNombres){
      const arrayArchivosNombres = value.archivosNombres.split(',');
      const arrayArchivosGuardados = value.archivosGuardados.split(',');
      
      for (let i = 0; i < arrayArchivosNombres.length; i++) {
        let archivo = {
          archivosNombres: arrayArchivosNombres[i],
          archivosGuardados: arrayArchivosGuardados[i]
        }
        arrayArchivos.push(archivo)
      }
    }

    return(
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.circuloMedico}>{value.entidadNombre} - </Text>
                <Text style={styles.fecha}>{value.fecha}</Text>
                </View>
                <Text style={styles.titulo}>{value.titulo}</Text>
                <RenderHtml
                contentWidth={width}
                source={{html: value.contenido}}
                />
                <View style={styles.containerArchivos}>
                    { value.archivosNombres ? 
                      arrayArchivos.map((prop, key) => {
                        return (
                        <TouchableOpacity onPress={() => visualizarPDF(prop.archivosGuardados)} style={{flexDirection: 'row'}} key={key} >
                                <Icon name="file-document-outline" color={'gray'} size={23}/>
                                <Text style={styles.archivos}> {prop.archivosNombres}</Text>
                        </TouchableOpacity>
                        )
                      }) : <Text style={{fontStyle: "italic"}}>No hay archivos anexados...</Text>  
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingVertical: 20,
      paddingHorizontal: 30,
    },
    circuloMedico: {
      fontWeight: 'bold',
      color: '#7e7b7f'
    },
    fecha: {
      color: '#bdbabd'
    },
    titulo: {
      fontSize: 25,
      marginTop: 15
    },
    contenido: {
      fontSize: 15,
      marginTop: 10,
      textAlign: 'justify'
    },
    containerArchivos: {
        marginTop: 10,
        padding: 10,
        borderTopWidth: 1, 
        borderTopColor: '#696969',
    },
    archivos: {
        fontWeight: '300',
        color: '#2694BD',
        margin: 5
    }
  });

export default NovedadDetalleComp;
