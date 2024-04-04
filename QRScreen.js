import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Importe a biblioteca para gerar QR Code

const QRScreen = ({ route, navigation }) => {
  //Receber o nome do aluno do 'LoginScreen'
  const { nomeAluno } = route.params;
  const { rm } = route.params;
   // Alterado o nome da propriedade para navigation
  const [logoImage] = useState(require('./Imagens/Logo_Etec.png'));
  const [rmList] = useState([ rm
  ]);

  const dismissKeyboard = () => { 
    Keyboard.dismiss();
  };

  // Navega de volta para a tela anterior (LoginScreen)
  const handleLogout = () => {
    navigation.goBack(); 
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
        <Text style={styles.nomeAluno}>{nomeAluno}</Text>
        {/* Gerar um QR Code com base no RM */}
        {rmList.map((rm, index) => (
          <View key={index}>
            <QRCode
              value={rm} // RM é usado como valor do QR Code
              size={300}
              style={styles.qrCode}
            />
          </View>
        ))}
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
  qrCode: {
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
    marginTop: 35,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  nomeAluno: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rmText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QRScreen;
