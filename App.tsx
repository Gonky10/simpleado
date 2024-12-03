
import React from 'react';
import { SafeAreaView, Dimensions,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
const Drawer = createDrawerNavigator();
let scale = Dimensions.get('screen').scale / Dimensions.get('window').scale;
const height = Dimensions.get('window').height * scale;
const width = Dimensions.get('window').width * scale;
export default function App() {
  return (
    <SafeAreaView
    style={{flex:1}}>
<NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
       screenOptions={{
        headerStyle: {
          backgroundColor: 'black', // Color de fondo del header
        },
        headerTintColor: '#fff', // Color del texto y los íconos en el header
        headerTitleStyle: {
          fontFamily: 'BarlowCondensed-Regular',
          fontSize: height * 0.03,
          fontWeight: '500'
        },
        headerRight: () => (
          <Image
            source={require('./assets/images/simpleado-logo.png')}
            style={{ width: width * 0.1, height: height * 0.05, marginRight: 10, borderRadius:10 }}
          />
        ),
        headerTitleAlign: 'center',
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

