import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const QRScreen = ({ navigation }) => { // Alterado o nome da propriedade para navigation
  const [logoImage] = useState(require('./Imagens/Logo_Etec.png'));
  const [qrCodeImage] = useState(require('./Imagens/qrcode.jpg'));

  const dismissKeyboard = () => { 
    Keyboard.dismiss();
  };

  const handleLogout = () => {
    navigation.goBack(); // Navega de volta para a tela anterior (LoginScreen)
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Image
            source={logoImage}
            style={styles.logo}
          />
        </View>
        {/* Exibir imagem do QRCode */}
        <Image
          style={styles.qrCodeImage}
          source={qrCodeImage}
        />
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  qrCodeImage: {
    width: 300,
    height: 300,
    marginBottom: 90,
  },
  button: {
    width: '45%',
    height: 45,
    backgroundColor: '#B22222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default QRScreen;
