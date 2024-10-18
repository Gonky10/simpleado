import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Armar Publicación</Text>
      <Text>Aquí puedes crear una nueva publicación.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default PostScreen;
