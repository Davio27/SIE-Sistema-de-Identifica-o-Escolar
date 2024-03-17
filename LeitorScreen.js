import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';



const LeitorScreen = ({ route }) => {
  const navigation = useNavigation();
  const { nomeUsuario } = route.params;

  const handleSair = () => {
    navigation.goBack();
  };

  const handleQRCodeRead = (result) => {
    if (result.data) {
      console.log('QR Code lido:', result.data);
      // Aqui você pode adicionar a lógica para manipular os dados do QR code
      // Por exemplo, fazer uma requisição para um servidor para processar os dados
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleQRCodeRead}
      />
      <View style={styles.qrArea} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Vigilante:</Text>
        <Text style={styles.text}>{nomeUsuario}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSair}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  qrArea: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -150, // Metade da altura do quadrado
    marginLeft: -150, // Metade da largura do quadrado
  },
  textContainer: {
    position: 'absolute',
    top: '40%',
    left: '70%',
    marginTop: -200, // Move o texto para cima
    marginLeft: -150, // Centraliza o texto horizontalmente
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  button: {
    position: 'absolute',
    bottom: 85, // Move o botão um pouco para cima
    backgroundColor: '#B22222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    height: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LeitorScreen;
