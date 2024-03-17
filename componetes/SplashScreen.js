// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 5000); // Tempo de espera em milissegundos

    return () => clearTimeout(timer); // Limpar o timer para evitar vazamento de memória
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./Imagens/Animacao2.gif')}
        style={styles.gif}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
  },
  gif: {
    width: 150,
    height: 200,
  },
});

export default SplashScreen;
