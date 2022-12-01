import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Novedades from './../Screens/Novedades';
import Liquidaciones from './../Screens/Liquidaciones';
import Importes from './../Screens/Importes';

// Custom 
import DrawerContent from '../Components/DrawerContent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route,navigation}) => {

  return (
      <Drawer.Navigator 
        initialRouteName="Novedades"
        useLegacyImplementation
        drawerContent={props => <DrawerContent {...props} {...route} />}
        screenOptions={{
            headerStyle: {
                backgroundColor: '#2386AB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            drawerLabelStyle: {marginLeft: -25}
          }}>
        <Drawer.Screen 
            name="Novedades" 
            component={Novedades} 
            initialParams={ route.params }
            options={{
                drawerIcon:({color}) => (
                    <Icon name="newspaper-variant-outline" color={color} size={25}/>
                )
            }}/>
             <Drawer.Screen 
            name="Liquidaciones" 
            component={Liquidaciones} 
            initialParams={ route.params }
            options={{
                drawerIcon:({color}) => (
                    <Icon name="currency-usd" color={color} size={25}/>
                )
            }}/>
        <Drawer.Screen 
            name="Importes" 
            component={Importes} 
            initialParams={ route.params }
            options={{
                drawerIcon:({color}) => (
                    <Icon name="clipboard-text-outline" color={color} size={25}/>
                )
                }}/>
      </Drawer.Navigator>
      
  );
}

export default DrawerNavigator;