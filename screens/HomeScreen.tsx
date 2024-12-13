import React from 'react';
import { View, Text, Button, StyleSheet,  Dimensions, Image} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';

type HomeScreenProps = {
  navigation: DrawerNavigationProp<any>;
};
let scale = Dimensions.get('screen').scale / Dimensions.get('window').scale;
const height = Dimensions.get('window').height * scale;
const width = Dimensions.get('window').width * scale;
const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Arma tus publicaciones para redes</Text>
      </View>
      <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.openDrawer()} >
        <Text
         
        style={styles.text1}>Armar publicacion</Text>
      </TouchableOpacity>
      <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: width * 0.06
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:width * 0.04,
    borderRadius:15,
    marginTop: height * 0.03,
    backgroundColor: 'black'
  },
  title: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: height * 0.05,
    color: 'white',
    textAlign: 'center'
  },
  touchableOpacity: {
    marginTop: height * 0.4,
    padding: 10,
    backgroundColor: 'black',
    borderRadius:10
  },
  text1: {
    fontFamily: 'BarlowCondensed-Regular',
    color: 'white'
  }
});

export default HomeScreen;
