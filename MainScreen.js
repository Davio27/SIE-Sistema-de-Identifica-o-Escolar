import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, Modal, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MainScreen = () => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [rm, setRM] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();



  const handleLogin = () => {
    if (nomeAluno && rm) {
        navigation.navigate('QRScreen', { rm, nomeAluno }); 
      }  else {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
    }
  };

  const handleTerms = () => {
    Linking.openURL('https://exemplo.com/termos-de-uso');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderMenuOptions = () => (
    <View style={styles.menuOptions}>

      {/* Botão Login */}
      <TouchableOpacity
        style={styles.menuOption}
        onPress={() => {
          setModalVisible(false);
          navigation.navigate('LoginScreen');
        }}
      >
        <Text style={styles.menuOptionText}>Login</Text>
      </TouchableOpacity>
      {/* Botão de Termos de Uso */}
      <TouchableOpacity
        style={styles.menuOption}
        onPress={() => {
          handleTerms();
          setModalVisible(false);
          // Navegar para a tela de termos de uso
        }}
      >
        <Text style={styles.menuOptionText}>Termos de Uso</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        {/* Ícone de menu */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.menuIcon}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </TouchableWithoutFeedback>

        {/* Modal de opções */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalCenteredView}>
              <View style={styles.modalView}>
                {renderMenuOptions()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.logoContainer}>
          <Image
            source={require('./Imagens/Logo_Etec.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Sistema de Identificação Escolar</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nomeAluno}
          onChangeText={text => setNomeAluno(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="RM/RP"
          value={rm}
          onChangeText={text => setRM(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={formatarDataNascimento(dataNascimento)}
          onChangeText={text => setDataNascimento(text)}
          keyboardType="numeric"
        /> */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Gerar QR-ID</Text>
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
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 25,
  },
  input: {
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: 19,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '45%',
    height: 50,
    backgroundColor: '#B22222',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuIcon: {
    position: 'absolute',
    top: 55,
    right: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#B22222',
    marginVertical: 1,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 550,
    padding: 30,
    elevation: 5,
    left: 100,
  },
  menuOptions: {
    width: '100%',
  },
  menuOption: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  menuOptionText: {
    fontSize: 18,
    color: 'black',
  },
});

export default MainScreen;
