import React from "react";

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../Screens/Login';
import DrawerNavigator from './Drawer';
import DetalleNovedad from '../Screens/DetalleNovedad';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
      
      <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#2386AB'
                    }
                }}>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
                <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} options={{headerShown: false}}/>
                <Stack.Screen name='DetalleNovedad' component={DetalleNovedad}  options={{title: 'Detalle de la Novedad'}}/>
            </Stack.Navigator>
        </NavigationContainer>
      
     );
};


export default AppStack;