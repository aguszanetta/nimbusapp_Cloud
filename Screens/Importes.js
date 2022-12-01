import React,  { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// API client
import axios from "axios";

const Importes = ({route}) => {
  const [importes, setImportes] = useState();

  const loadImportes = async () =>{
    const url = 'http://myIP/Nimbus%20Salud%203.3/endpoint-mobileV2.php'
    axios
      .post(url, {opcion: 4, usuario: route.params.usuario, entidad: "66"})
      .then((response) => {
          const result = response.data;
          setImportes(result);
      })
      .catch(error => {
          console.log(error);
      })
  }

  useEffect(() => {
    loadImportes();
  }, [])

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>    
        <Text style={styles.textCardTitle}>
            Próxima Liquidación
        </Text>
        <View style={styles.rowContent}>
          <Text style={styles.textCard}>
          {(!importes) ? <ActivityIndicator size="large" color="#999999"/> : 
          importes[0]?.fecha || <Text>No se encontró</Text>
          }
          </Text>
          <Icon name="calendar-today" style={styles.cardIcon}/>
        </View>
      </View>
      <View style={styles.card}>    
        <Text style={styles.textCardTitle}>
            Importe Liquidado
        </Text>
        <View style={styles.rowContent}>
          <Text style={styles.textCard}>
          {(!importes) ? <ActivityIndicator size="large" color="#999999"/> :
            importes[0]?.netopos || <Text>No se encontró</Text>
          }
        {}
          </Text>
          <Icon name="currency-usd" style={styles.cardIcon}/>
        </View>
      </View>
      <View style={styles.card}>    
        <Text style={styles.textCardTitle}>
        Importe de Factura
        </Text>
        <View style={styles.rowContent}>
          <Text style={styles.textCard}>
          {(!importes) ? <ActivityIndicator size="large" color="#999999"/> : 
            importes[0]?.totfact || <Text>No se encontró</Text>
          }
          </Text>
          <Icon name="currency-usd" style={styles.cardIcon}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  card: {
    backgroundColor:"#f5f5f5",
    height: 125,
    width: 300,
    marginVertical:30,
    marginHorizontal:20,
    borderRadius:20,
    paddingVertical:20,
    paddingHorizontal:20,
    borderLeftWidth: 5,
    borderLeftColor: '#2386AB',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  textCardTitle: {
    color:"#2386AB",
    fontSize:25,
    fontWeight:"Bold",
  },
  textCard: {
    color:"#000",
    fontSize:20,
    fontWeight:"300",
    marginTop:15
  },
  rowContent: {
    flexDirection:"row",
    justifyContent:'space-between'
  },
  cardIcon: {
    color: "#DDDFEB",
    fontSize: 50,
  }
});

export default Importes;