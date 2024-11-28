
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaView
    style={{flex:1}}>
<NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
       screenOptions={{
        headerStyle: {
          backgroundColor: 'gray', // Color de fondo del header
        },
        headerTintColor: '#fff', // Color del texto y los íconos en el header
        headerTitleStyle: {
          fontWeight: 'bold', // Estilo de la fuente del título
        },
        headerTitleAlign: 'center', // Centrar el título
      }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Simpleado' }} // Opciones para personalizar el título
        />
        <Drawer.Screen
            name="Post"
            component={PostScreen}
            options={{ title: 'Posteos' }} // Cambia el título si lo necesitas
          />
      </Drawer.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    
  );
}

