import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text ,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';

// API client
import axios from "axios";


const Liquidaciones = ({route}) => {
  const [liqData, setliqData] = useState();
  const loadLiquidaciones = async (usuario) =>{
    const url = 'http://myIP/Nimbus%20Salud%203.3/endpoint-mobileV2.php'
    axios
      .post(url, {opcion: 3, usuario: usuario})
      .then((response) => {
          const result = response.data;
          let arrayData = []
          result.map(function(item) {
            arrayData.push([item.nliq, item.entidad, item.fliq, item.submat, 
              item.tothon, item.totgtos, item.totiva, item.totfact, item.totff, 
              item.totgan, item.totib, item.totjub, item.totrhon, item.totrgtos, 
              item.totdeb, item.totcred, item.netoneg, item.netopos])
          });
          setliqData(arrayData)    
      })
      .catch(error => {
          console.log(error);
      })
  }
  
  useEffect(() => {
    loadLiquidaciones(route.params.usuario);
  }, [])

  const state = {
    tableHead: ['Nº Pago', 'Ent.', 'Fecha', '	C.P.', 
    'Honorarios', 'Gastos', 'IVA', 'T. Fact.	', 'F.F.', 
    'Ganancias', 'Ing.Btos.', 'C.P.S.M.', 'CSoc.Hon.', 
    'CSoc.Gto.', 'Aj.Deb.', 'Aj.Cred.', 'Neto (-)', 'Neto (+)'],
    widthArr: [100, 60, 100, 60, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
  }

  return (
    <View style={styles.container}>
       {
         (!liqData) ? <ActivityIndicator size="large" color="#999999"/> :
           (liqData.length == 0) ? <Text>No se encontraron liquidaciones</Text> :
           <ScrollView horizontal={true}>
             <View>
               <Table borderStyle={{borderWidth: 1, borderColor: '#dddddd'}}>
                 <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
               </Table>
               <ScrollView style={styles.dataWrapper}>
                 <Table borderStyle={{borderWidth: 1, borderColor: '#dddddd'}}>
                   {
                     liqData?.map((rowData, index) => (
                       <Row
                         key={index}
                         data={rowData}
                         widthArr={state.widthArr}
                         style={[styles.row, index%2 && {backgroundColor: '#dbf1ec'}]}
                         textStyle={styles.text}
                       />
                       
                     ))
                   }
                 </Table>
               </ScrollView>
             </View>
           </ScrollView>
       }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  header: { 
    height: 50, 
    backgroundColor: '#cfe8f8' 
  },
  text: { 
    textAlign: 'center', 
    fontWeight: '200',
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#f9f9f9' 
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  card: {
    backgroundColor:"#2386AB",
    marginTop:15,
    marginHorizontal:20,
    borderRadius:20,
    paddingVertical:30,
    paddingLeft:30
  },
  textCard: {
    color:"#FFF",
    fontSize:20,
    fontWeight:"Bold",
  },
  btnText: {
    textAlign: 'center',
    fontWeight: '300',
    color: '#33a4d9'
  }
});
export default Liquidaciones;