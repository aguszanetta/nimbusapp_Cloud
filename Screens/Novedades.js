import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TextInput, ActivityIndicator } from 'react-native';

// Componet
import Novedad from '../Components/Novedad';
import EmptyNovedad from '../Components/EmptyNovedad';

// API client
import axios from "axios";

const Novedades = ({navigation, route}) => {
  const [novedades, setNovedades] = useState();
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadNovedades();
    setRefreshing(false);
  })
  
  const loadNovedades = async () =>{
    const url = 'http://myIP/Nimbus%20Salud%203.3/endpoint-mobileV2.php'
    axios
      .post(url, {opcion: 2, codEntidades: route.params.entidad})
      .then((response) => {
          const result = response.data;
          setNovedades(result);
      })
      .catch(error => {
          console.log(error);
      })
  }

  useEffect(() => {
    loadNovedades();
  }, [])

  return (
      (!novedades) ? <ActivityIndicator size="large" color="#999999" style={styles.spinner}/> : 
      <FlatList 
        contentContainerStyle={{ flexGrow: 1 }}
        style={{marginBottom: 25}}
        data={novedades}
        keyExtractor={(item) => item.idnovedades}
        renderItem={(item) => (
          
          <Novedad
          navigation = {navigation}
          value = {item.item}
          />
        )}
        ListEmptyComponent = {() => (
          <EmptyNovedad />
        )}
        refreshControl={
          <RefreshControl 
          refreshing={ refreshing }
          onRefresh={() => {onRefresh()}}
          />
        }
        />
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center"
  },
  buscarCard:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#FFF",
    padding:10,
    borderRadius:12,
    marginHorizontal:20,
    marginTop:20,
  },
  buscarInput: {
      fontStyle: 'italic',
      width:280,
      paddingHorizontal:12
  }
});

export default Novedades;