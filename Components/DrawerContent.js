import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DrawerContent = (props) => {
    const insets = useSafeAreaInsets();

    const logout = async () => {
      try {
        await AsyncStorage.removeItem("medico");
      } catch (err) {
        console.log(err);
      }
      props.navigation.navigate('Login');
      };

    return (
        <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{paddingTop: insets.top}}> 
          <ImageBackground
            source={require('../assets/img/bg5.png')}
            style={{padding: 20}}>
            <Image
              source={require('../assets/img/user1.png')}
              style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
              }}>
              {/*  Nombre y Apellido */}
              { props.params.nombre }
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#fff',
                  marginRight: 5,
                }}>
                {/* Matricula */}
                { props.params.usuario }
              </Text>
            </View>
          </ImageBackground>
          <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          
          <TouchableOpacity onPress={() => logout()} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="exit-to-app" color={'gray'} size={25}/>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                }}>
                Salir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default DrawerContent;